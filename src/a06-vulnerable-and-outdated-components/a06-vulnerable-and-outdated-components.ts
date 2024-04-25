import si from "systeminformation";


export async function testLatency(host: string) {
    // TODO fix the vulnerability, maybe there is an update available?
    // https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26274
    await si.inetLatency(host)
}
