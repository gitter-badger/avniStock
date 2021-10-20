import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import Stock from '../components/Stock';

const AddStockScreen = ({navigation}) => {
  return (
    <Fragment>
      <AppBar
        title={'Add stock'}
        navigation={navigation}
        showBackButton={true}
      />
      <Stock navigation={navigation} />
    </Fragment>
  );
};

export default AddStockScreen;
