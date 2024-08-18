import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const data1 = [
  {
    img: require('../../assets/images/student1.png'),
    name: "Kajal Sharma",
    winingAmount: '40',
    winingNumber: [27, 17, 32, 29, 40]
  },
  {
    img: require('../../assets/images/sudent2.png'),
    name: "Soraj Jhosi",
    winingAmount: '300',
    winingNumber: [27, 17, 32, 29, 40]
  },
  {
    img: require('../../assets/images/student3.png'),
    name: "Priya Riya",
    winingAmount: '100',
    winingNumber: [27, 17, 32, 29, 40]
  },
  {
    img: require('../../assets/images/student4.png'),
    name: "Riya ",
    winingAmount: '250',
    winingNumber: [27, 17, 32, 29, 40]
  },
  {
    img: require('../../assets/images/student5.png'),
    name: "Sonam Kumar",
    winingAmount: '40',
    winingNumber: [27, 17, 32, 29, 40]
  },
]

const TopWinner = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.head}>Top Winners</Text>
      </View>

      {data1.map((curelem, index) => (
        <View key={index} style={styles.cont1}>
          <View>
            <Image source={curelem.img} style={styles.img} />
          </View>

          <View>
            <Text style={styles.userName}>{curelem.name}</Text>
            <Text style={styles.userWinAmount}>{curelem.winingAmount}</Text>
            <View style={styles.numbers}>
              {curelem.winingNumber.map((number, index) => (
                <View key={index} style={styles.wincont}>
                  <Text style={styles.winnumber}>{number}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

export default TopWinner

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#021324',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  head: {
    color: '#fff',
    fontFamily: "Poppins-Regular",
    fontSize: 22,
    textAlign: "center"
  },
  cont1: {
    flexDirection: "row",
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#ffd700",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    marginVertical: 10,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: '#ffd700',
    borderWidth: 2,
    borderStyle: 'solid',
    marginRight: 20,
  },
  userName: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#fff"
  },
  userWinAmount: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#fff"
  },
  numbers: {
    flexDirection: "row",
    marginTop: 5,
  },
  wincont: {
    backgroundColor: "#ffd700",
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  winnumber: {
    fontSize: 12,
    fontFamily: "Poppins-Bold",
    color: "#fff",
    textAlign: 'center',
  }
})
