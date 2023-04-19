import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { countConfirmedTasks } from '../functions/database';
import TaskCard from '../components/TaskCard';

const BookedAppointments = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await countConfirmedTasks();
      setTasks(data);
    }

    fetchData();
  }, [])

  return (
    <ScrollView>
      {tasks && tasks.map((item, index) => (
        <TaskCard
          key={index}
          task={item}
          onPress={() => { }}
        />
      ))}
    </ScrollView>
  )
}

export default BookedAppointments