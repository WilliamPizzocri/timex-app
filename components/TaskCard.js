import { View, Text, Image } from 'react-native'
import React from 'react'
import { getUserImage } from '../functions/database'
import { getDataString } from '../functions/utilitys'
import { styles } from "../style"

const TaskCard = ({task}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/timex-app-98255.appspot.com/o/user.png?alt=media&token=608b2289-1b79-41be-93a9-f8d9f6867bcf' }} style={{ width: 200, height: 200 }}/>
        <View>
            <Text>{task.jobName}</Text>
            <Text>{task.description}</Text>
        </View>
      </View>
      <View>
        <Text>{getDataString(task.date)}</Text>
        <Text>{task.payment}</Text>
      </View>
    </View>
  )
}

export default TaskCard