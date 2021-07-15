import { useEffect, useState, useMemo } from 'react';
import Table, { debounceSearchRender } from 'mui-datatables';
import { Box, Text, Flex, Spinner } from '@chakra-ui/react';
import CountUp from 'react-countup';

export default function UpdateTable() {
  const [tableData, setTableData] = useState();
  const [date, setDate] = useState('');
  const [apiError, setApiError] = useState('');
  const options = {
    selectableRows: 'none',
    responsive: 'simple',
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 16],
    customSearchRender: debounceSearchRender(500),
    filter: false,
    sortOrder: {
      name: 'daily_total',
      direction: 'desc',
    },
    elevation: 0,
  };
  const columns = useMemo(
    () => [
      {
        name: 'stateName',
        label: 'State',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField',
          customHeadLabelRender: columnMeta => {
            let colHead = (
              <Text
                color="gray.500"
                fontWeight="semibold"
                fontSize="0.8rem"
                textAlign="left"
              >
                {columnMeta.label.toUpperCase()}
              </Text>
            );
            return colHead;
          },
        },
      },
      {
        name: 'daily_total',
        label: 'Total Today',
        options: {
          filter: true,
          sort: true,
          sortDescFirst: true,
          filterType: 'textField',
          customBodyRenderLite: dataIndex => {
            if (dataIndex <= 33) {
              let val = tableData[dataIndex].daily_total;
              let x = (
                <Text>
                  <CountUp separator="," end={val} />
                </Text>
              );
              return x;
            }
          },
          customHeadLabelRender: columnMeta => {
            let colHead = (
              <Text
                color="gray.500"
                fontWeight="semibold"
                fontSize="0.8rem"
                textAlign="left"
              >
                {columnMeta.label.toUpperCase()}
              </Text>
            );
            return colHead;
          },
        },
      },
      {
        name: 'daily_dose1',
        label: 'Today 1st Dose',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField',
          customBodyRenderLite: dataIndex => {
            if (dataIndex <= 33) {
              let val = tableData[dataIndex].daily_dose1;
              let x = (
                <Text>
                  <CountUp separator="," end={val} />
                </Text>
              );
              return x;
            }
          },
          customHeadLabelRender: columnMeta => {
            let colHead = (
              <Text
                color="gray.500"
                fontWeight="semibold"
                fontSize="0.8rem"
                textAlign="left"
              >
                {columnMeta.label.toUpperCase()}
              </Text>
            );
            return colHead;
          },
        },
      },
      {
        name: 'daily_dose2',
        label: 'Today 2nd Dose',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField',
          customBodyRenderLite: dataIndex => {
            if (dataIndex <= 33) {
              let val = tableData[dataIndex].daily_dose2;
              let x = (
                <Text>
                  <CountUp separator="," end={val} />
                </Text>
              );
              return x;
            }
          },
          customHeadLabelRender: columnMeta => {
            let colHead = (
              <Text
                color="gray.500"
                fontWeight="semibold"
                fontSize="0.8rem"
                textAlign="left"
              >
                {columnMeta.label.toUpperCase()}
              </Text>
            );
            return colHead;
          },
        },
      },
      {
        name: 'total_total',
        label: 'Total',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField',
          customBodyRenderLite: dataIndex => {
            if (dataIndex <= 33) {
              let val = tableData[dataIndex].total_total;
              let x = (
                <Text>
                  <CountUp separator="," end={val} />
                </Text>
              );
              return x;
            }
          },
          customHeadLabelRender: columnMeta => {
            let colHead = (
              <Text
                color="gray.500"
                fontWeight="semibold"
                fontSize="0.8rem"
                textAlign="left"
              >
                {columnMeta.label.toUpperCase()}
              </Text>
            );
            return colHead;
          },
        },
      },
      {
        name: 'total_dose1',
        label: 'Total 1st Dose',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField',
          customBodyRenderLite: dataIndex => {
            if (dataIndex <= 33) {
              let val = tableData[dataIndex].total_dose1;
              let x = (
                <Text>
                  <CountUp separator="," end={val} />
                </Text>
              );
              return x;
            }
          },
          customHeadLabelRender: columnMeta => {
            let colHead = (
              <Text
                color="gray.500"
                fontWeight="semibold"
                fontSize="0.8rem"
                textAlign="left"
              >
                {columnMeta.label.toUpperCase()}
              </Text>
            );
            return colHead;
          },
        },
      },
      {
        name: 'total_dose2',
        label: 'Total 2nd Dose',
        options: {
          filter: true,
          sort: true,
          filterType: 'textField',
          customBodyRenderLite: dataIndex => {
            if (dataIndex <= 33) {
              let val = tableData[dataIndex].total_dose2;
              let x = (
                <Text>
                  <CountUp separator="," end={val} />
                </Text>
              );
              return x;
            }
          },
          customHeadLabelRender: columnMeta => {
            let colHead = (
              <Text
                color="gray.500"
                fontWeight="semibold"
                fontSize="0.8rem"
                textAlign="left"
              >
                {columnMeta.label.toUpperCase()}
              </Text>
            );
            return colHead;
          },
        },
      },
    ],
    [tableData]
  );

  useEffect(() => {
    fetch('https://myvaccination-backend.vercel.app/api/vacc/update/states')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then(data => {
        setDate(data.modifiedData.date);
        setTableData(data.modifiedData.stateData);
      })
      .catch(err => {
        setApiError(err.toString());
        console.error('Error when fetching the data: ', err.toString());
      });
  }, []);

  return (
    <>
      {tableData ? (
        <Box mt={5}>
          <Flex wrap="wrap" justify="space-between" alignItems="center">
            <Text fontWeight="bold" color="gray.600">
              State Update
            </Text>
            <Flex color="gray.500" fontSize="1rem">
              Last Updated:
              <Text ml={3} fontWeight="semibold">
                {date ? <>{date}</> : <Spinner />}
              </Text>
            </Flex>
          </Flex>
          <Box mt={3} border="1px" borderColor="gray.200" borderRadius="10px">
            <Table
              title={'COVID-19 Update'}
              data={tableData}
              columns={columns}
              options={options}
            />
          </Box>
        </Box>
      ) : null}
    </>
  );
}
