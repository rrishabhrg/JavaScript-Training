import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { callApi } from '../../lib';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: localStorage.getItem('token') ? localStorage.getItem('token') : '',
            cityList: {},
            paramsList: {},
        };
    }

    // componentDidMount = async () => {
    //     console.log('side did mount');
    //     const { selectedCountry } = this.state;
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const method = 'get';
    //         const url = 'https://api.openaq.org/v1/cities?country=' + selectedCountry;
    //         const data = {};
    //         try {
    //             const res = await callApi({ method, url, data });
    //             this.setState({
    //                 cityList: res.data.results,
    //             });
    //         } catch (error) {
    //             console.log('ERROR OCCURS---->', error);
    //         }
    //     } else {
    //         return (
    //             <CircularProgress />
    //         );
    //     }
    //     if (token) {
    //         const method = 'get';
    //         const url = 'https://api.openaq.org/v1/parameters';
    //         const data = {};
    //         try {
    //             const res = await callApi({ method, url, data });
    //             this.setState({
    //                 paramsList: res.data.results,
    //             });
    //         } catch (error) {
    //             console.log('ERROR OCCURS---->', error);
    //         }
    //     } else {
    //         return (
    //             <CircularProgress />
    //         );
    //     }
    // }

    render() {
        // const { cityList, paramsList } = this.state;
        const { makeChange, doChange, city, cities, parameters } = this.props;
        // console.log('My Parameters Are:', param);
        if (!(cities.length)) {
            return <CircularProgress />
        }
        // if (!parameters.length) {
        //     return <CircularProgress />;
        // }
        return (
            <React.Fragment>
                <div style={{ width: '25%' }}>
                    <h3>Filters</h3>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">City</FormLabel>
                            <div style={{ overflowY: 'scroll', width: '100%', height: '200px', position: 'relative' }}>
                                <RadioGroup
                                    aria-label="City"
                                    name="city"
                                    value={city}
                                    onChange={makeChange}
                                >
                                    {
                                        cities.map(row => (
                                            <FormControlLabel key={row.city} label={row.city} value={row.city} control={<Radio />}>
                                                {row.city}
                                            </FormControlLabel>
                                        ))
                                    }
                                </RadioGroup>
                            </div>
                        </FormControl>
                        {/* <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                            <FormLabel>Parameters</FormLabel>
                            <div style={{ overflowY: 'scroll', width: '100%', height: '200px', position: 'relative' }}>
                                <FormGroup>
                                    {
                                        parameters.map(row => (
                                            <FormControlLabel
                                                key={row.city}
                                                label={row.id}
                                                onChange={doChange}
                                                control={<Checkbox
                                                    value={row.id}
                                                    // onChange={doChange}
                                                />}
                                            >
                                                {row.id}
                                            </FormControlLabel>
                                        ))
                                    }
                                </FormGroup>
                            </div>
                        </FormControl> */}
                        <FormControl component="fieldset" style={{ marginTop: '30px' }}>
                            <FormLabel component="legend">HasGeo</FormLabel>
                        </FormControl>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SideBar;
