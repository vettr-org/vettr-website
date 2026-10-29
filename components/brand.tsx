import Image from "next/image";

export function Brand() {
 return (<span className="brand"><Image src="/assets/de692.svg" width={48} height={48} alt="" unoptimized /><span className="wordmark"><span className="initial">W</span>orked With</span></span>);
}
