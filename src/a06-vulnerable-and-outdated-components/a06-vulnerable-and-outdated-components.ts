import si from "systeminformation";


export async function testLatency(host: string) {
    await si.inetLatency(host)
}
