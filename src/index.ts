import express from 'express';
//import { json } from 'node:stream/consumers';
const app = express();
const port = 8000;

import * as si from 'systeminformation';

const baseUri = '/api/v1/sysinfo';

async function sysinfo() {

 interface ISystemInformation {
  cpu: si.Systeminformation.CpuData;
  system: si.Systeminformation.SystemData;
  mem: si.Systeminformation.MemData;
  os: si.Systeminformation.OsData;
  currentLoad: si.Systeminformation.CurrentLoadData;
  processes: si.Systeminformation.ProcessesData;
  diskLayout: si.Systeminformation.DiskLayoutData[];
  networkInterfaces: si.Systeminformation.NetworkInterfacesData[];
}


const sys: ISystemInformation = {
  cpu : await si.cpu(),
  system : await si.system(),
  mem : await si.mem(),
  os : await si.osInfo(),
  currentLoad: await si.currentLoad(),
  processes : await si.processes(),
  diskLayout: await si.diskLayout(),
  networkInterfaces: await si.networkInterfaces(),
};
return sys;
}




app.get(baseUri, async (req, res) => {
  const info = await sysinfo();
  res.send(info);
});

app.all('*', (req, res) => {
  res.status(404).send('Page not found !!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}${baseUri}`);
});
