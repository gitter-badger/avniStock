import React, {Fragment} from 'react';
import AppBar from '../components/AppBar';
import {changeLanguage, getCurrentLocale, t} from '../service/i18n/messages';
import LanguageSelection from '../components/LanguageSelection';
import {getService} from '../hooks/getService';
import UserInfoService from '../service/UserInfoService';

const ChangeLanguageScreen = ({navigation}) => {
  const [locale, setLocale] = React.useState(getCurrentLocale());

  const onLocaleChange = locale => {
    changeLanguage(locale);
    setLocale(locale);
    getService(UserInfoService).updateLocale(locale);
  };

  return (
    <Fragment>
      <AppBar
        title={t('changeLanguage')}
        navigation={navigation}
        showBackButton={true}
      />
      <LanguageSelection
        currentLocale={locale}
        onLocaleChange={onLocaleChange}
      />
    </Fragment>
  );
};

export default ChangeLanguageScreen;
