import { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Flex,
  Spinner,
  Stack,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react';
import CountUp from 'react-countup';
export default function HerdImmunity() {
  const [nationalData, setNationalData] = useState();
  const labelText = useColorModeValue('gray.500', 'gray.100');
  const textColor = useColorModeValue('gray.600', 'gray.100');
  const bg = useColorModeValue('white', '#36326f');
  const border = useColorModeValue('#E5E4FB', '#66508c');
  const myPop = 26125920;

  useEffect(async () => {
    await fetch('https://myvaccination-backend.vercel.app/api/vacc/update')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => {
        setNationalData([
          {
            title: 'Total 1st & 2nd Dose',
            percent: (data.modifiedData.total_total / myPop) * 100,
            data: data.modifiedData.total_total,
            barColor: 'teal',
          },
          {
            title: 'Total 2nd Dose',
            percent: (data.modifiedData.total_dose2 / myPop) * 100,
            data: data.modifiedData.total_dose2,
            barColor: 'blue',
          },
          {
            title: 'Total 1st Dose',
            percent: (data.modifiedData.total_dose1 / myPop) * 100,
            data: data.modifiedData.total_dose1,
            barColor: 'blue',
          },
        ]);
      })
      .catch(err => {
        console.error(
          'Error when fetching national vaccination data: ',
          err.toString()
        );
      });
  }, []);

  return (
    <>
      <Box mt={5}>
        <Text color={labelText} fontWeight="bold">
          Road to Herd Immunity
        </Text>
        <Box
          mt={3}
          border="2px"
          borderColor={border}
          borderRadius="10px"
          bg={bg}
        >
          {nationalData ? (
            <Box p={5} fontWeight="semibold" color={textColor}>
              <Stack>
                {nationalData.map(data => {
                  console.log(data);
                  return (
                    <Box borderBottom="1px" borderColor="gray.500" pb={5}>
                      <Flex fontSize={['0.9rem', '1rem']}>
                        <Text>{data.title}</Text>
                        <Text ml={2}>
                          (
                          <CountUp
                            duration={0.75}
                            separator=","
                            end={data.percent}
                            decimal="."
                            decimals={2}
                          />
                          %)
                        </Text>
                      </Flex>

                      <Stack>
                        <Box>
                          <Flex
                            wrap="wrap"
                            justifyContent="space-between"
                            my={2}
                          >
                            <Stack spacing={0}>
                              <Text
                                fontSize={['0.7rem', '0.8rem']}
                                fontWeight="700"
                              >
                                TOTAL
                              </Text>
                              <Text fontSize={['1rem', '1.2rem']}>
                                <CountUp
                                  duration={0.75}
                                  separator=","
                                  end={data.data}
                                />
                              </Text>
                            </Stack>
                            <Stack spacing={0} textAlign="right">
                              <Text
                                fontSize={['0.7rem', '0.8rem']}
                                fontWeight="700"
                              >
                                TARGET
                              </Text>
                              <Text fontSize={['1rem', '1.2rem']}>
                                <CountUp
                                  duration={0.75}
                                  separator=","
                                  end={myPop}
                                />
                              </Text>
                            </Stack>
                          </Flex>
                          <Progress
                            value={data.percent}
                            colorScheme={data.barColor}
                            borderRadius="10px"
                          />
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
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
    </>
  );
}
