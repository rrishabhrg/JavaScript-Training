/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { NavBar, Footer, Prompt } from './Components';
import { TableList } from './pages';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="root">
          <NavBar />
          <TableList />
          {/* <Footer /> */}
        </div>
      </React.Fragment>
    //   DAY-9
    //   <MuiThemeProvider theme={theme}>
    //     <React.Fragment>
    //       <div id="root">
    //         <Trainee />
    //       </div>
    //     </React.Fragment>
    //   </MuiThemeProvider>
    //   DAY-10
    //   <MuiThemeProvider theme={theme}>
    //     <React.Fragment>
    //       <CssBaseline />
    //       <div id="root">
    //         <Login />
    //         <Navbar />
    //       </div>
    //     </React.Fragment>
    //   </MuiThemeProvider>
    //   DAY-11, 12, 13, 14, 15
    //   <SnackbarProvider>
    //     <MuiThemeProvider theme={theme}>
    //       <CssBaseline />
    //       <BrowserRouter>
    //         <Switch>
    //           <PrivateRoute path="/trainee" component={Trainee} />
    //           <AuthRoute exact path="/login" component={Login} />
    //           <PrivateRoute exact path="/text-field-demo" component={SliderDemo} />
    //           <PrivateRoute exact path="/input-demo" component={InputDemo} />
    //           <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
    //           <PrivateRoute exact path="/" component={Navbar} />
    //           <Route path="" component={NoMatch} />
    //         </Switch>
    //       </BrowserRouter>
    //     </MuiThemeProvider>
    //   </SnackbarProvider>
    );
  }
}

export default App;