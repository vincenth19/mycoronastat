import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Spinner,
  SimpleGrid,
  Stat,
  StatNumber,
  StatArrow,
} from '@chakra-ui/react';
import { RiVirusLine, RiHeartAddFill } from 'react-icons/ri';
import { GiTombstone } from 'react-icons/gi';
import CountUp from 'react-countup';

export default function Covid() {
  const [caseData, setCaseData] = useState();
  const [apiError, setApiError] = useState('');
  const [modifiedData, setModifiedData] = useState();
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries/MYS?strict=true')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => {
        setCaseData(data);
      })
      .catch(err => {
        setApiError(err.toString());
        console.error('Error when fetching the data: ', err.toString());
      });
  }, []);

  useEffect(() => {
    if (caseData) {
      setModifiedData([
        {
          title: 'Positive Cases',
          icon: <RiVirusLine />,
          textColor: 'red.500',
          bg: 'linear-gradient(#ffebec, #fcd7d8)',
          total: caseData.cases,
          today: caseData.todayCases,
          percentage: (caseData.todayCases / caseData.cases) * 100,
          arrowColor: 'red.600',
        },
        {
          title: 'Recovery',
          icon: <RiHeartAddFill />,
          textColor: 'teal.500',
          bg: 'linear-gradient(#c0f9ef, #b2f5ea)',
          total: caseData.recovered,
          today: caseData.todayRecovered,
          percentage: (caseData.todayRecovered / caseData.recovered) * 100,
          arrowColor: 'teal.600',
        },
        {
          title: 'Death',
          icon: <GiTombstone />,
          textColor: 'gray.500',
          bg: 'linear-gradient(#f4f8fc, #edf2f7)',
          total: caseData.deaths,
          today: caseData.todayDeaths,
          percentage: (caseData.todayDeaths / caseData.deaths) * 100,
          arrowColor: 'red.600',
        },
      ]);
    }
  }, [caseData]);

  return (
    <Box p={5} mt={1}>
      {modifiedData ? (
        <>
          <Flex justify="space-between" alignItems="center">
            <Text fontWeight="bold" color="gray.600">
              COVID-19
            </Text>
            <Flex color="gray.500" fontSize="1rem">
              Last Updated:
              <Text ml={3} fontWeight="semibold">
                {new Date(caseData.updated).toLocaleDateString(
                  'en-MY',
                  dateOptions
                )}
              </Text>
              <Text ml={3} fontWeight="semibold">
                {new Date(caseData.updated).getHours()} :{' '}
                {new Date(caseData.updated).getMinutes()}
              </Text>
            </Flex>
          </Flex>
          <SimpleGrid
            minChildWidth={{ lg: '32%', md: '100%', sm: '100%', base: '100%' }}
            spacing="2%"
            mt={3}
          >
            {modifiedData.map(data => {
              return (
                <Box border="2px" borderColor="#E5E4FB" borderRadius="10px">
                  <Flex
                    py={2}
                    px={3}
                    backgroundImage={data.bg}
                    borderTopRadius="10px"
                    color={data.textColor}
                    fontWeight="semibold"
                    alignItems="center"
                  >
                    <Text fontSize="2.5rem">{data.icon}</Text>
                    <Text ml={3}>{data.title}</Text>
                  </Flex>
                  <Box py={2} px={3} bg="white" borderBottomRadius="10px">
                    <Stat>
                      <StatNumber>
                        <CountUp
                          duration={0.75}
                          separator=","
                          end={data.total}
                        />
                      </StatNumber>
                      <Flex alignItems="center" fontSize="0.8rem">
                        <StatArrow type="increase" color={data.arrowColor} />
                        <Flex>
                          <Text>
                            <CountUp
                              duration={0.75}
                              separator=","
                              end={data.today}
                            />
                          </Text>
                          <Text ml={1}>
                            (
                            <CountUp
                              duration={0.75}
                              separator=","
                              decimals={2}
                              decimal="."
                              end={data.percentage}
                            />
                            %)
                          </Text>
                        </Flex>
                      </Flex>
                    </Stat>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
}
