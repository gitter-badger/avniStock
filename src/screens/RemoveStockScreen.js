import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import RemoveStock from '../components/RemoveStock';

const RemoveStockScreen = ({navigation}) => {
  return (
    <Fragment>
      <AppBar
        title={'Remove stock'}
        navigation={navigation}
        showBackButton={true}
      />
      <RemoveStock navigation={navigation} />
    </Fragment>
  );
};

export default RemoveStockScreen;
