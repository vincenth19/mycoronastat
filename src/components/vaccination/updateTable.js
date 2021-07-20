import { useEffect, useState, useMemo } from 'react';
import Table, { debounceSearchRender } from 'mui-datatables';
import {
  Box,
  Text,
  Flex,
  Spinner,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import CountUp from 'react-countup';
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles';

import { DownloadIcon } from '@material-ui/icons/GetApp';

export default function UpdateTable() {
  const [tableData, setTableData] = useState();
  const [date, setDate] = useState('');
  const [apiError, setApiError] = useState('');
  const bgg = useColorModeValue('#ffffff', '#1b1b1b');
  const labelText = useColorModeValue('gray.500', 'gray.100');
  const { colorMode } = useColorMode();

  const options = {
    selectableRows: 'none',
    responsive: 'vertical',
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
              <Text fontWeight="semibold" fontSize="0.8rem" textAlign="left">
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
              <Text fontWeight="semibold" fontSize="0.8rem" textAlign="left">
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
              <Text fontWeight="semibold" fontSize="0.8rem" textAlign="left">
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
              <Text fontWeight="semibold" fontSize="0.8rem" textAlign="left">
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
              <Text fontWeight="semibold" fontSize="0.8rem" textAlign="left">
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
              <Text fontWeight="semibold" fontSize="0.8rem" textAlign="left">
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
              <Text fontWeight="semibold" fontSize="0.8rem" textAlign="left">
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

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: colorMode === 'light' ? '#fff' : '#36326F',
            color: '#ffffff',
          },
          paper: {
            boxShadow: 'none',
            backgroundColor: colorMode === 'light' ? '#fff' : '#36326F',
            borderRadius: '10px',
          },
        },
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: colorMode === 'light' ? '#fff' : '#36326F',
            color: colorMode === 'light' ? '#1b1b1b' : '#fff',
          },
        },
        MUIDataTableToolbar: {
          root: {
            backgroundColor: colorMode === 'light' ? '#fff' : '#36326F',
            color: colorMode === 'light' ? '#708196' : '#fff',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          },
        },
        MUIDataTableHeadCell: {
          fixedHeader: {
            backgroundColor: colorMode === 'light' ? '#fff' : '#36326F',
          },
          sortActive: { color: colorMode === 'light' ? '#718096' : '#fff' },
          sortAction: { color: colorMode === 'light' ? '#718096' : '#fff' },
        },
        MUIDataTablePagination: {
          root: {
            backgroundColor: colorMode === 'light' ? '#fff' : '#36326F',
            color: colorMode === 'light' ? '#1b1b1b' : '#fff',
          },
          tableCellContainer: {
            backgroundColor: colorMode === 'light' ? '#fff' : '#36326F',
            color: colorMode === 'light' ? '#1b1b1b' : '#fff',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
          },
        },
        MuiButton: {
          root: {
            color: colorMode === 'light' ? '#1b1b1b' : '#fff',
          },
        },
        MuiButtonBase: {
          root: {
            color: colorMode === 'light' ? '#1b1b1b' : '#fff',
          },
        },
        MuiSvgIcon: {
          root: {
            color: colorMode === 'light' ? '#708196' : '#fff',
          },
        },
        MuiSelect: {
          icon: {
            color: colorMode === 'light' ? '#1b1b1b' : '#fff',
          },
        },
        MuiPopover: {
          paper: {
            backgroundColor: colorMode === 'light' ? '#fff' : '#5753A4',
          },
        },
      },
    });

  useEffect(() => {
    // let x = [
    //   {
    //     stateName: 'W.P. Kuala Lumpur',
    //     daily_dose1: 48343,
    //     daily_dose2: 22266,
    //     daily_total: 70609,
    //     total_dose1: 1540433,
    //     total_dose2: 426607,
    //     total_total: 1967040,
    //   },
    //   {
    //     stateName: 'W.P. Putrajaya',
    //     daily_dose1: 2398,
    //     daily_dose2: 439,
    //     daily_total: 2837,
    //     total_dose1: 63257,
    //     total_dose2: 34420,
    //     total_total: 97677,
    //   },
    //   {
    //     stateName: 'W.P. Labuan',
    //     daily_dose1: 335,
    //     daily_dose2: 2206,
    //     daily_total: 2541,
    //     total_dose1: 40233,
    //     total_dose2: 35586,
    //     total_total: 75819,
    //   },
    // ];

    // x.sort((v1, v2) => {
    //   return v2.total_dose1 - v1.total_dose1;
    // });

    // console.log('x', x);

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
            <Text fontWeight="bold" color={labelText}>
              State Update
            </Text>
            <Flex color={labelText} fontSize="1rem">
              Last Updated:
              <Text ml={3} fontWeight="semibold">
                {date ? <>{date}</> : <Spinner />}
              </Text>
            </Flex>
          </Flex>
          <Box mt={3}>
            <MuiThemeProvider theme={getMuiTheme()}>
              <Table
                title={'COVID-19 Update'}
                data={tableData}
                columns={columns}
                options={options}
                components={{
                  icons: {
                    DownloadIcon,
                    DownloadIcon,
                    DownloadIcon,
                    DownloadIcon,
                    DownloadIcon,
                  },
                }}
              />
            </MuiThemeProvider>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
