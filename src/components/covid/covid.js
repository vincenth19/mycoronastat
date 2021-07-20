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
  StatLabel,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { RiVirusLine, RiHeartAddFill } from 'react-icons/ri';
import { GiTombstone } from 'react-icons/gi';
import CountUp from 'react-countup';

export default function Covid() {
  const [caseData, setCaseData] = useState();
  const [apiError, setApiError] = useState('');
  const [modifiedData, setModifiedData] = useState();
  const bg = useColorModeValue('white', '#36326f');
  const border = useColorModeValue('#E5E4FB', '#66508c');
  const labelText = useColorModeValue('gray.500', 'gray.100');

  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(async () => {
    await fetch('https://disease.sh/v3/covid-19/countries/MYS?strict=true')
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
          iconColor: 'red.500',
          bg: 'linear-gradient(#ffebec, #fcd7d8)',
          total: caseData.cases,
          today: caseData.todayCases,
          percentage: (caseData.todayCases / caseData.cases) * 100,
          arrowColor: 'red.400',
        },
        {
          title: 'Recovery',
          icon: <RiHeartAddFill />,
          iconColor: 'teal.500',
          bg: 'linear-gradient(#c0f9ef, #b2f5ea)',
          total: caseData.recovered,
          today: caseData.todayRecovered,
          percentage: (caseData.todayRecovered / caseData.recovered) * 100,
          arrowColor: 'teal.400',
        },
        {
          title: 'Death',
          icon: <GiTombstone />,
          iconColor: 'gray.500',
          bg: 'linear-gradient(#f4f8fc, #edf2f7)',
          total: caseData.deaths,
          today: caseData.todayDeaths,
          percentage: (caseData.todayDeaths / caseData.deaths) * 100,
          arrowColor: 'red.400',
        },
      ]);
    }
  }, [caseData]);

  if (apiError) {
    return (
      <Box border="2px" borderColor="#E5E4FB" borderRadius="10px">
        <Box align="center">
          <Text>There is an issue when fetching the data from the API.</Text>
          <Text>Error: {apiError}</Text>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box mt={3}>
        <>
          <Flex wrap="wrap" justify="space-between" alignItems="center">
            <Text fontWeight="bold" color={labelText}>
              COVID-19 Data
            </Text>
            <Flex color="gray.500" fontSize="1rem" color={labelText}>
              Last Updated:
              <Text ml={3} fontWeight="semibold">
                {modifiedData ? (
                  new Date(caseData.updated).toLocaleDateString(
                    'en-MY',
                    dateOptions
                  )
                ) : (
                  <Spinner />
                )}
              </Text>
            </Flex>
          </Flex>
          <Box
            border="2px"
            borderColor={border}
            borderRadius="10px"
            mt={3}
            bg={bg}
          >
            {modifiedData ? (
              <SimpleGrid
                minChildWidth={{
                  lg: '32%',
                  md: '100%',
                  sm: '100%',
                  base: '100%',
                }}
                spacing="2%"
              >
                <Flex py={3} wrap="wrap">
                  <>
                    {modifiedData.map(data => {
                      return (
                        <Flex flexGrow={1}>
                          <Flex pl={5} pr={3} py={3} alignItems="center">
                            <Box bg={data.bg} p={3} borderRadius="100%">
                              <Text color={data.iconColor} fontSize="2rem">
                                {data.icon}
                              </Text>
                            </Box>
                          </Flex>
                          <Flex py={2} px={3} flexGrow={[0, 1]}>
                            <Stat>
                              <StatLabel>
                                <Text color={labelText} fontWeight="semibold">
                                  {data.title}
                                </Text>
                              </StatLabel>
                              <StatNumber>
                                <CountUp
                                  duration={0.75}
                                  separator=","
                                  end={data.total}
                                />
                              </StatNumber>
                              <Flex alignItems="center" fontSize="0.8rem">
                                <StatArrow
                                  type="increase"
                                  color={data.arrowColor}
                                />
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
                          </Flex>
                        </Flex>
                      );
                    })}
                  </>
                </Flex>
              </SimpleGrid>
            ) : (
              <Flex justifyContent="center" alignItems="center" my={5}>
                <Spinner
                  color="#736DD9"
                  size="xl"
                  speed="0.65s"
                  emptyColor="gray.200"
                  thickness="4px"
                />
              </Flex>
            )}
          </Box>
        </>
      </Box>
    );
  }
}
