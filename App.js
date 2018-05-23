import React from 'react';
import { Alert, RefreshControl, FlatList, List, ListItem, Button, View, Text, StyleSheet, TextInput, Image, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json

class Header extends React.Component {
	render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > Pendaftaran Anggota Perpustakaan </Text>
        </View>
    );
  }

}
class Header2 extends React.Component {
	render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > Sewa Kamera </Text>
        </View>
    );
  }

}
class Header3 extends React.Component {
	render() {
    return (
      <View style={styles.box1}>
            <Text style={styles.text} > Anggota Perpustakaan </Text>
        </View>
    );
  }

}

class HomeScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header2/>,
	};
constructor(props){
    super(props)
    this.state = {
      Username: '',
      Password: '',
      ActivityIndicator_Loading: false,
    };
  }
UserLoginFunction = () => {
        this.setState({ ActivityIndicator_Loading: true }, () => {
            fetch('http://agusyudi.000webhostapp.com/api/login.php',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Username: this.state.Username,
                        Password: this.state.Password,
                    })

                }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({ ActivityIndicator_Loading: false });
                  
                    if (responseJson === 'Login berhasil!') {
                        this.props.navigation.navigate('Data');
                    }
                    else {
                        Alert.alert(responseJson);
                    }

                }).catch((error) => {
                    console.error(error);
                    this.setState({ ActivityIndicator_Loading: false });
                });

        });
    }
  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'yellow' }}>
        <Image 
          source={require('./src/img/logo3.png')}
          style={{width: 100, height: 100}} />
        <View style={{margin:5, padding: 5, backgroundColor: 'white', borderRadius: 3 }}>
        <TextInput style={{ width: 250, height: 30, color: 'black', alignItems: 'center', justifyContent: 'center' }}
          placeholder="Username "
          placeholderTextColor="gray"
          underlineColorAndroid='transparent'
          onChangeText={(Username) => this.setState({ Username })}
        />
        </View>
        <View style={{margin:5, padding: 5, backgroundColor:'white', borderRadius:3, paddingTop: 5 }}>
        <TextInput style={{ width: 250, height: 30, color: 'black' }}
          placeholder="Password "
          placeholderTextColor="gray"
          underlineColorAndroid='transparent'
          onChangeText={(Password) => this.setState({ Password })}
        />
        </View>
        <View style={{ flexDirection: 'row' }}>
        <Button
          title="Registrasi"
          onPress={() => this.props.navigation.navigate('Anggota')}//menuju anggota screen
        />
        <Button
          title="Login"
          color="blue"
          onPress={this.UserLoginFunction}
        />
      </View>
      </View>
    );
  }
}
class AnggotaScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header3/>,
	};

	constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}

  componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'https://agusyudi.000webhostapp.com/api/ambilData.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
  _keyExtractor = (item, index) => item.nim;
  render() {
    
    return (
    	
        <View style={ styles.containerMain2 }>
      <View style={ styles.Header }>
        <Text style={ styles.TextHeader }> Daftar Anggota Perpustakaan </Text>
      </View>
         {
          this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#2196F3' size='large'style={styles.ActivityIndicatorStyle} /> : null        
          }
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.BoxClass}>
              <Text>NIM 	: {item.nim}</Text>
              <Text>Nama 	: {item.nama}</Text>
              <Text>Jurusan : {item.jurusan}</Text>
              
            </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.componentDidMount.bind(this)}
          />
        }
        /> 
        

   </View>   
      
    );
  }
}

class DataScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header2/>,
	};
  render() {
    
    return (
    	<View style={styles.box2}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Image 
          source={require('./src/img/logo1.png')}
          style={{width: 100, height: 100}} />
       <Button
          title="Gede_photography"
          color="blue"
          onPress={() => this.props.navigation.navigate('Kamera')}
        />
        <Image 
          source={require('./src/img/logo2.png')}
          style={{width: 100, height: 100}} />
        <Button
          title="Mini_photography"
          onPress={() => this.props.navigation.navigate('Kamera')}
        />
        <Image 
          source={require('./src/img/tude.png')}
          style={{width: 100, height: 100}} />
        <Button
          title="Tude_photography"
          color="blue"
          onPress={() => this.props.navigation.navigate('Kamera')}
        />
      </View>
      </View>
    );
  }
}
class KameraScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <Header2/>,
  };
  render() {
   
    return (
      <View style={styles.box2}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image 
          source={require('./src/img/canon11.png')}
          style={{width: 100, height: 100}} />
       <Button
          title="CANON 1200D"
          color="blue"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Image 
          source={require('./src/img/canon12.png')}
          style={{width: 100, height: 100}} />
        <Button
          title="CANON 700D"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Image 
          source={require('./src/img/canon4.png')}
          style={{width: 100, height: 100}} />
        <Button
          title="CANON 1300D"
          color="blue"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
	static navigationOptions = {
		headerTitle: <Header2/>,
	};
	 constructor()
    {
        super();
 
        this.state = { 
          nama: '',
          kamera: '',
          lamasewa: '',
          alamat: '',
          noktp: '',
          nohp: '',
          ActivityIndicator_Loading: false, 

        }
    }
    //fungsi mengirim data ke database
    Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://agusyudi.000webhostapp.com/api/kirimData.php',
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  nama : this.state.nama,
                  kamera : this.state.kamera,
                  lamasewa : this.state.lamasewa,
                  alamat : this.state.alamat,
                  noktp : this.state.noktp,
                  nohp : this.state.nohp,
                })
 
            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                /*Alert.alert(
                  'Oops!',
                  'Something went wrong!',
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )*/
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }
  render() {
    return (
      <View style={styles.containerMain}>

        <View style={styles.box2}>
            <Text style={styles.text} > Masukkan Biodata </Text>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
              placeholder="Nama "
              placeholderTextColor="gray"
              underlineColorAndroid='transparent'
                onChangeText={(nama) => this.setState({ nama })}
              />
            </View>
            
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
              placeholder="Jenis Kamera "
              placeholderTextColor="gray"
              underlineColorAndroid='transparent'
              
                onChangeText={(kamera) => this.setState({ kamera })}
              />
            </View>
            
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
              placeholder="Lama Sewa"
              placeholderTextColor="gray"
              underlineColorAndroid='transparent'
                onChangeText={(lamasewa) => this.setState({ lamasewa })}
              />
            </View>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
              placeholder="Alamat"
              placeholderTextColor="gray"
              underlineColorAndroid='transparent'
                onChangeText={(alamat) => this.setState({ alamat })}
              />
            </View>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
              placeholder="No KTP"
              placeholderTextColor="gray"
              underlineColorAndroid='transparent'
                onChangeText={(noktp) => this.setState({ noktp })}
              />
            </View>
            <View style={{ marginLeft: 50, marginRight: 50, padding: 10, backgroundColor: 'white' }}>
              <TextInput
              style={{ height: 40 }}
              placeholder="No Telepon"
              placeholderTextColor="gray"
              underlineColorAndroid='transparent'
                onChangeText={(nohp) => this.setState({ nohp })}
              />
            </View>

           <View style={{ marginTop: 10, marginLeft: 50, marginRight: 50, padding: 1,flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button
          title="kirim"
          color="blue"
          onPress={() => this.props.navigation.navigate('Details')}
        />
           </View>
        </View>



        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
          color="green"
        />
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    Data: {
      screen: DataScreen,
    },
    Kamera: {
      screen: KameraScreen,
    },
    Anggota: {
      screen: AnggotaScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#BBDEFB',
    flex: 1,
    flexDirection: 'column',
  },
  
  containerMain2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center'
  },
  box2: {
    flex: 2,
    backgroundColor: 'green',
    margin: 20
  },
  box3: {
    flex: 1,
    backgroundColor: 'green',
    margin: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  box4: {
    flex: 1,
    backgroundColor: 'green',
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },

  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    padding: 17,
    fontSize: 20
  },
  TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#2196F3',
      marginBottom: 20,
      width: '70%',
      borderRadius: 7 
 
    },
 
    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{
      
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    
  },
  BoxClass:
    {
      alignItems: 'flex-start',
      height: 100,
      width: 320,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#2196F3',
      borderRadius: 7 ,
      marginBottom: 10,
      paddingTop: 5,
      paddingBottom: 5,

    },
    Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeader: {
        fontSize: 20,
        color: '#2196F3'
    }, 
});
