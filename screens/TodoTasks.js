import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { countBookedTasks } from '../functions/database';
import TaskCard from '../components/TaskCard';

const TodoTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await countBookedTasks();
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

export default TodoTasks