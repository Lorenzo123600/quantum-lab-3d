// A real, normalized minimum-uncertainty 1D state. x and sigma are in nm;
// psi has units nm^(-1/2), rho has units nm^(-1). q = p/hbar is in nm^(-1).
export function gaussianDensity(x,sigma){return Math.exp(-x*x/(2*sigma*sigma))/(Math.sqrt(2*Math.PI)*sigma);}
export function gaussianAmplitude(x,sigma){return Math.sqrt(gaussianDensity(x,sigma));}
export function momentumDensity(q,sigma){return Math.sqrt(2/Math.PI)*sigma*Math.exp(-2*sigma*sigma*q*q);}
export function sampleGaussian(sigma,rng=Math.random){const u=Math.max(Number.MIN_VALUE,rng()),v=rng();return sigma*Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);}
