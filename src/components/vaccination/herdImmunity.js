import { useEffect, useState } from 'react';
import { Box, Text, Flex, Spinner, Stack, Progress } from '@chakra-ui/react';
import CountUp from 'react-countup';
export default function HerdImmunity() {
  //const [stateData, setStateData] = useState('');
  //const [stateProgress, setStateProgress] = useState();
  const [nationalData, setNationalData] = useState();

  //   useEffect(async () => {
  //     await fetch(
  //       'https://myvaccination-backend.vercel.app/api/vacc/update/states'
  //     )
  //       .then(res => {
  //         if (res.ok) {
  //           return res.json();
  //         } else {
  //           throw res;
  //         }
  //       })
  //       .then(data => {
  //         let temp = [{
  //             stateName:
  //         }]
  //         setStateData(data.modifiedData.stateData);
  //       })
  //       .catch(err => {
  //         console.error(
  //           'Error when fetching state vaccination update data: ',
  //           err.toString()
  //         );
  //       });
  //   }, []);

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
        setNationalData({
          num: data.modifiedData.total_dose1,
          barNum: (data.modifiedData.total_dose1 / 26125920) * 100,
        });
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
        <Text fontWeight="bold" color="gray.600">
          Road to Herd Immunity
        </Text>
        <Box
          mt={3}
          border="2px"
          borderColor="#E5E4FB"
          borderRadius="10px"
          bg="white"
        >
          {nationalData ? (
            <Box p={5} fontWeight="semibold" color="gray.600">
              <Text fontSize="1rem">Malaysia</Text>
              <Stack>
                <Box>
                  <Flex wrap="wrap" justifyContent="space-between" my={2}>
                    <Flex>
                      <Text>
                        <CountUp
                          duration={0.75}
                          separator=","
                          end={nationalData.num}
                        />
                      </Text>
                      <Text ml={2}>
                        (
                        <CountUp
                          duration={0.75}
                          separator=","
                          end={nationalData.barNum}
                          decimal="."
                          decimals={2}
                        />
                        %)
                      </Text>
                    </Flex>
                    <Text>
                      <CountUp duration={0.75} separator="," end={26125920} />
                    </Text>
                  </Flex>
                  <Progress
                    value={nationalData.barNum}
                    colorScheme="purple"
                    borderRadius="10px"
                  />
                </Box>
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
