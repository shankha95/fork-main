/*
Copyright 2024 Shahmir Ejaz

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import '@mantine/core/styles.css';
import { Flex, MantineProvider, Image, Title, Button, NavLink } from '@mantine/core';
import testingScenarioImage from './assets/testing_scenario.png';
import operatorImage from './assets/operator_diagram.png';
import cpuLightImage from './assets/cpu_light_workload.png';
import cpuHeavyImage from './assets/cpu_heavy_workload.png';
import axios from 'axios';
import { useState } from 'react';

const baseURL = "http://192.168.2.52:4000"

function App() {
  const [maliciousSingleClusterPlot, setMaliciousSingleClusterPlot] = useState<string | null>(null)
  const [maliciousMultiClusterPlot, setMaliciousMultiClusterPlot] = useState<string | null>(null)
  
  const [maliciousSingleClusterLoading, setMaliciousSingleClusterLoading] = useState(false)
  const [maliciousMultiClusterLoading, setMaliciousMultiClusterLoading] = useState(false)
  
  const maliciousSingleClusterClickHandler = async () => {
    setMaliciousSingleClusterLoading(true)
    const res = await axios.post(`${baseURL}/attack/malicious/single`)
    if (res.status === 200) {
      setMaliciousSingleClusterPlot(res.data['file'])
    }
    setMaliciousSingleClusterLoading(false)
  }
  
  const maliciousMultiClusterClickHandler = async () => {
    setMaliciousMultiClusterLoading(true)
    const res = await axios.post(`${baseURL}/attack/malicious/multi`)
    if (res.status === 200) {
      setMaliciousMultiClusterPlot(res.data['file'])
    }
    setMaliciousMultiClusterLoading(false)
  }
  
  return (
    <MantineProvider>
      <Flex direction='column' gap='lg' py='md'>
        <Title order={2} ml='4rem'>FORK</Title>
  
        <Flex direction='row' w='100%'>
          <Flex direction='column' gap='xl' mr='6rem'>
            <Image radius='sm' h={250} w='auto' fit='contain' src={testingScenarioImage} />
            <Image radius='sm' h={400} w='auto' fit='contain' src={operatorImage} />
          </Flex>
  
          <Flex direction='column' mt='4rem'>
            <Button loading={maliciousSingleClusterLoading} onClick={maliciousSingleClusterClickHandler}>
              Malicious Single Cluster
            </Button>
            {maliciousSingleClusterPlot && <NavLink href={`${baseURL}/plot/${maliciousSingleClusterPlot}`} target="_blank" rel="noopener" label='Show plot' />}
  
            <Button loading={maliciousMultiClusterLoading} onClick={maliciousMultiClusterClickHandler}>
              Malicious Multi Cluster
            </Button>
            {maliciousMultiClusterPlot && <NavLink href={`${baseURL}/plot/${maliciousMultiClusterPlot}`} target="_blank" rel="noopener" label='Show plot' />}
          </Flex>
        </Flex>
      </Flex>
    </MantineProvider>
  )
  
export default App
