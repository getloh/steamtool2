import { SvgProps } from "./SvgProps"

export default function LoadingRipple(props: SvgProps){
    return (

<svg xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<circle cx="50" cy="50" r="0" fill="none" stroke="#c97e22" strokeWidth="2">
  <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.282051282051282s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate>
</circle><circle cx="50" cy="50" r="0" fill="none" stroke="#1578ba" strokeWidth="2">
  <animate attributeName="r" repeatCount="indefinite" dur="1.282051282051282s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.641025641025641s"></animate>
  <animate attributeName="opacity" repeatCount="indefinite" dur="1.282051282051282s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.641025641025641s"></animate>
</circle>
</svg>
        )
}
