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
  Progress,
} from '@chakra-ui/react';
import { RiSyringeFill } from 'react-icons/ri';
import CountUp from 'react-countup';

export default function Vaccination() {
  const [nationalData, setNationalData] = useState();
  const [apiError, setApiError] = useState('');
  const [modifiedData, setModifiedData] = useState();
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(async () => {
    await fetch('https://myvaccination-backend.vercel.app/api/vacc/update/')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => {
        setNationalData(data.modifiedData);
      })
      .catch(err => {
        setApiError(err.toString());
        console.error('Error when fetching the data: ', err.toString());
      });
  }, []);

  useEffect(() => {
    if (nationalData) {
      let temp = (nationalData.total_dose1 / 26125920) * 100;
      setModifiedData([
        {
          title: 'Total',
          icon: <RiSyringeFill />,
          iconColor: 'blue.600',
          bg: 'blue.50',
          px: 3,
          total: nationalData.total_total,
          today: nationalData.update_total,
          percentage:
            (nationalData.update_total / nationalData.total_total) * 100,
          arrowColor: 'teal.600',
        },
        {
          title: '1st Dose',
          icon: (
            <Text fontWeight="bold" fontSize="1.5rem">
              1
            </Text>
          ),
          iconColor: 'blue.600',
          bg: 'blue.50',
          px: 6,
          total: nationalData.total_dose1,
          today: nationalData.update_dose1,
          percentage:
            (nationalData.update_dose1 / nationalData.total_dose1) * 100,
          arrowColor: 'teal.600',
        },
        {
          title: '2nd Dose',
          icon: (
            <Text fontWeight="bold" fontSize="1.6rem">
              2
            </Text>
          ),
          iconColor: 'blue.600',
          bg: 'blue.50',
          px: 6,
          total: nationalData.total_dose2,
          today: nationalData.update_dose2,
          percentage:
            (nationalData.update_dose2 / nationalData.total_dose2) * 100,
          arrowColor: 'teal.600',
        },
      ]);
    }
  }, [nationalData]);

  return (
    <Box mt={5}>
      <Flex wrap="wrap" justify="space-between" alignItems="center">
        <Text fontWeight="bold" color="gray.600">
          Vaccination Progress
        </Text>
        <Flex color="gray.500" fontSize="1rem">
          Last Updated:
          <Text ml={3} fontWeight="semibold">
            {modifiedData ? (
              new Date().toLocaleDateString('en-MY', dateOptions)
            ) : (
              <Spinner />
            )}
          </Text>
        </Flex>
      </Flex>
      <Box
        border="2px"
        borderColor="#E5E4FB"
        borderRadius="10px"
        bg="white"
        mt={3}
      >
        {modifiedData ? (
          <>
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
                          <Box
                            bg={data.bg}
                            px={data.px}
                            py={3}
                            borderRadius="100%"
                          >
                            <Text color={data.iconColor} fontSize="2rem">
                              {data.icon}
                            </Text>
                          </Box>
                        </Flex>
                        <Flex py={2} px={3} flexGrow={[0, 1]}>
                          <Stat>
                            <StatLabel>
                              <Text color="gray.500" fontWeight="semibold">
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
          </>
        ) : (
          <Flex my={5} justifyContent="center" alignItems="center">
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
    </Box>
  );
}
