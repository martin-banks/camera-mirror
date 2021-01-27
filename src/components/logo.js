import React from 'react'
import Styled from 'styled-components'


const Svg = Styled.svg`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 6rem;
  min-width: 150px;
  width: 30vw;
  max-width: 200px;
`
const CameraBox = Styled.rect`
  fill: black;
  @media screen and (prefers-color-scheme: dark) {
    fill: white;
  }
`
const MirrorBox = Styled.path`
  fill: black;
  @media screen and (prefers-color-scheme: dark) {
    fill: white;
  };
`
const Camera = Styled.path`
  fill: white;
  @media screen and (prefers-color-scheme: dark) {
    fill: black;
  };
`
const Mirror = Styled.path`
  fill: black;
  @media screen and (prefers-color-scheme: dark) {
    fill: white;
  };
`

const Logo = () => {

  return <div>
    <Svg
      viewBox="0 0 100 82"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <title>camera-mirror-logo</title>
      <g
        id="camera-mirror-logo-group"
        stroke="none"
        strokeWidth="0"
        fill="none"
        fillRule="evenodd"
      >
        <CameraBox
          id="camera-box"
          x="0"
          y="0"
          width="100"
          height="40"
        ></CameraBox>
        <MirrorBox
          id="mirror-box"
          d="M100,42 L100,82 L0,82 L0,42 L100,42 Z M99,43 L1,43 L1,81 L99,81 L99,43 Z"
        ></MirrorBox>
        <Camera
          id="camera-text"
          d="M14.9021656,4 C18.2618599,4 19.1244841,5.0442293 19.1244841,8.63092994 L19.1244841,8.63092994 L19.1244841,15.2141146 L17.8078471,15.2141146 L17.8074484,8.90726013 C17.7968326,6.13099431 17.5552298,5.22583439 14.8567643,5.22583439 L14.8567643,5.22583439 L13.3585223,5.22583439 C10.5890446,5.22583439 10.4074395,6.17926115 10.4074395,9.13034395 L10.4078383,31.3276443 C10.418454,34.1039101 10.6600568,35.0090701 13.3585223,35.0090701 L13.3585223,35.0090701 L14.8567643,35.0090701 C17.626242,35.0090701 17.8078471,34.0556433 17.8078471,31.1045605 L17.8078471,23.6587516 L19.1244841,23.6587516 L19.1244841,31.6039745 C19.1244841,35.1906752 18.2618599,36.2349045 14.9021656,36.2349045 L14.9021656,36.2349045 L13.2677197,36.2349045 C9.90802548,36.2349045 9,35.1906752 9,31.6039745 L9,31.6039745 L9,8.63092994 C9,5.0442293 9.90802548,4 13.2677197,4 L13.2677197,4 Z M28.6587516,4.22700637 L33.3350828,36.0078981 L31.9276433,36.0078981 L31.0650191,30.3781401 L24.1186242,30.3781401 L23.3014013,36.0078981 L22.0755669,36.0078981 L26.7518981,4.22700637 L28.6587516,4.22700637 Z M38.6924331,4.22700637 L43.0055541,30.1057325 C43.1871592,31.2861656 43.3687643,32.7390064 43.5049682,34.1010446 C43.5957707,32.7390064 43.8227771,31.2861656 44.0043822,30.1057325 L44.0043822,30.1057325 L48.3629045,4.22700637 L50.2243567,4.22700637 L50.2243567,36.0078981 L48.8623185,36.0078981 L48.8623185,11.2188025 C48.8623185,10.0383694 48.953121,8.35852229 48.9985223,6.99648408 C48.8169172,8.35852229 48.6353121,9.99296815 48.4083057,11.2188025 L48.4083057,11.2188025 L44.1859873,36.0078981 L42.6877452,36.0078981 L38.4654268,11.2188025 C38.2384204,9.81136306 37.9206115,7.81370701 37.7844076,6.27006369 C37.8752102,7.81370701 37.9206115,10.0383694 37.9206115,11.2188025 L37.9206115,11.2188025 L37.9206115,36.0078981 L36.6947771,36.0078981 L36.6947771,4.22700637 L38.6924331,4.22700637 Z M62.9821146,4.22700637 L62.9821146,5.45284076 L56.580535,5.45284076 L56.580535,18.6646115 L62.210293,18.6646115 L62.210293,19.8904459 L56.580535,19.8904459 L56.580535,34.7820637 L62.9821146,34.7820637 L62.9821146,36.0078981 L55.1730955,36.0078981 L55.1730955,4.22700637 L62.9821146,4.22700637 Z M72.6979873,4.22700637 C75.9813248,4.22700637 76.9231668,5.22431008 76.9642818,8.61731073 L76.965707,8.85793631 L76.965707,15.2595159 C76.965707,18.0743949 76.3754904,19.3456306 74.5140382,19.754242 C76.3154436,20.1496725 76.9263057,21.3104522 76.9638416,23.9360939 L76.965707,24.2035669 L76.965707,30.4235414 C76.965707,32.2963439 77.0801561,34.0928471 77.3789952,35.6032277 L77.465121,36.0078981 L75.9214777,36.0078981 C75.6223634,35.1479445 75.5695786,33.7029587 75.5602636,32.1040169 L75.5588589,31.7591872 L75.5582675,24.4305732 C75.5582675,21.5592494 75.1714447,20.4071382 72.6414143,20.3469593 L72.4255796,20.3444586 L68.1578599,20.3444586 L68.1578599,36.0078981 L66.7504204,36.0078981 L66.7504204,4.22700637 L72.6979873,4.22700637 Z M86.5907771,4.22700637 L91.2671083,36.0078981 L89.8596688,36.0078981 L88.9970446,30.3781401 L82.0506497,30.3781401 L81.2334268,36.0078981 L80.0075924,36.0078981 L84.6839236,4.22700637 L86.5907771,4.22700637 Z M27.6145223,6.04305732 C27.3089368,8.66236159 26.7514951,12.7088509 26.063282,17.2945707 L25.9800764,17.8473885 L24.3002293,29.1523057 L30.883414,29.1523057 L29.2489682,17.8473885 C28.567949,13.0348535 27.9323312,8.76713376 27.6145223,6.04305732 Z M85.5465478,6.04305732 C85.2409623,8.66236159 84.6835206,12.7088509 83.9953074,17.2945707 L83.9121019,17.8473885 L82.2322548,29.1523057 L88.8154395,29.1523057 L87.1809936,17.8473885 C86.4999745,13.0348535 85.8643567,8.76713376 85.5465478,6.04305732 Z M72.6071847,5.45284076 L68.1578599,5.45284076 L68.1578599,19.1186242 L72.6071847,19.1186242 C75.3312611,19.1186242 75.5582675,18.1651975 75.5582675,15.2141146 L75.5578688,9.1342665 C75.547253,6.35800068 75.3056502,5.45284076 72.6071847,5.45284076 Z"
          fillRule="nonzero"
        ></Camera>
        <Mirror
          id="mirror-text"
          d="M30.7385987,46 C34.098293,46 35.0063185,47.0442293 35.0063185,50.6309299 L35.0063185,73.6039745 C35.0063185,77.1906752 34.098293,78.2349045 30.7385987,78.2349045 L29.0587516,78.2349045 C25.6990573,78.2349045 24.7910318,77.1906752 24.7910318,73.6039745 L24.7910318,50.6309299 C24.7910318,47.0442293 25.6990573,46 29.0587516,46 L30.7385987,46 Z M79.2835159,46.2270064 L83.6420382,72.1057325 C83.8236433,73.2861656 84.0506497,74.7390064 84.1414522,76.1010446 C84.2776561,74.7390064 84.4592611,73.2861656 84.6408662,72.1057325 L88.9539873,46.2270064 L90.9516433,46.2270064 L90.9516433,78.0078981 L89.7258089,78.0078981 L89.7258089,53.2188025 C89.7258089,52.0383694 89.7712102,49.813707 89.8620127,48.2700637 C89.7258089,49.813707 89.408,51.8113631 89.1809936,53.2188025 L84.9586752,78.0078981 L83.4604331,78.0078981 L79.2381146,53.2188025 C79.0111083,51.9929682 78.8295032,50.3585223 78.6478981,48.9964841 C78.6932994,50.3585223 78.7841019,52.0383694 78.7841019,53.2188025 L78.7841019,78.0078981 L77.4220637,78.0078981 L77.4220637,46.2270064 L79.2835159,46.2270064 Z M72.0733248,46.2270064 L72.0733248,78.0078981 L70.6658854,78.0078981 L70.6658854,46.2270064 L72.0733248,46.2270064 Z M65.2717452,46.2270064 L65.2717452,78.0078981 L63.8643057,78.0078981 L63.8643057,62.3444586 L59.596586,62.3444586 C56.8725096,62.3444586 56.4638981,63.4794904 56.4638981,66.4305732 L56.4633067,73.7591872 C56.458871,75.4935473 56.4211675,77.0865193 56.1006879,78.0078981 L54.5570446,78.0078981 C54.9202548,76.4188535 55.0564586,74.4665987 55.0564586,72.4235414 L55.0564586,66.2035669 C55.0564586,63.3886879 55.6466752,62.1628535 57.5081274,61.754242 C55.6466752,61.3456306 55.0564586,60.0743949 55.0564586,57.2595159 L55.0564586,50.8579363 C55.0564586,47.2712357 55.9644841,46.2270064 59.3241783,46.2270064 L65.2717452,46.2270064 Z M49.9801274,46.2270064 L49.9801274,78.0078981 L48.5726879,78.0078981 L48.5726879,62.3444586 L44.3049682,62.3444586 C41.5808917,62.3444586 41.1722803,63.4794904 41.1722803,66.4305732 L41.1716888,73.7591872 C41.1672531,75.4935473 41.1295496,77.0865193 40.8090701,78.0078981 L39.2654268,78.0078981 C39.6286369,76.4188535 39.7648408,74.4665987 39.7648408,72.4235414 L39.7648408,66.2035669 C39.7648408,63.3886879 40.3550573,62.1628535 42.2165096,61.754242 C40.3550573,61.3456306 39.7648408,60.0743949 39.7648408,57.2595159 L39.7648408,50.8579363 C39.7648408,47.2712357 40.6728662,46.2270064 44.0325605,46.2270064 L49.9801274,46.2270064 Z M19.7147006,46.2270064 L19.7147006,78.0078981 L18.3072611,78.0078981 L18.3072611,62.3444586 L14.0395414,62.3444586 C11.315465,62.3444586 10.9068535,63.4794904 10.9068535,66.4305732 L10.9062621,73.7591872 C10.9018264,75.4935473 10.8641229,77.0865193 10.5436433,78.0078981 L9,78.0078981 C9.36321019,76.4188535 9.49941401,74.4665987 9.49941401,72.4235414 L9.49941401,66.2035669 C9.49941401,63.3886879 10.0896306,62.1628535 11.9510828,61.754242 C10.0896306,61.3456306 9.49941401,60.0743949 9.49941401,57.2595159 L9.49941401,50.8579363 C9.49941401,47.2712357 10.4074395,46.2270064 13.7671338,46.2270064 L19.7147006,46.2270064 Z M30.6477962,47.2258344 L29.1495541,47.2258344 C26.4510887,47.2258344 26.2094858,48.1309943 26.1988701,50.9072601 L26.1984713,73.1045605 C26.1984713,76.0556433 26.3800764,77.0090701 29.1495541,77.0090701 L30.6477962,77.0090701 C33.3462616,77.0090701 33.5878645,76.1039101 33.5984802,73.3276443 L33.598879,51.1303439 C33.598879,48.1792611 33.4172739,47.2258344 30.6477962,47.2258344 Z M63.8643057,47.4528408 L59.4149809,47.4528408 C56.7165154,47.4528408 56.4749126,48.3580007 56.4642968,51.1342665 L56.4638981,57.2141146 C56.4638981,60.1651975 56.6909045,61.1186242 59.4149809,61.1186242 L63.8643057,61.1186242 L63.8643057,47.4528408 Z M48.5726879,47.4528408 L44.1233631,47.4528408 C41.4248976,47.4528408 41.1832948,48.3580007 41.172679,51.1342665 L41.1722803,57.2141146 C41.1722803,60.1651975 41.3992866,61.1186242 44.1233631,61.1186242 L48.5726879,61.1186242 L48.5726879,47.4528408 Z M18.3072611,47.4528408 L13.8579363,47.4528408 C11.1594708,47.4528408 10.917868,48.3580007 10.9072523,51.1342665 L10.9068535,57.2141146 C10.9068535,60.1651975 11.1338599,61.1186242 13.8579363,61.1186242 L18.3072611,61.1186242 L18.3072611,47.4528408 Z"
          fillRule="nonzero"
        ></Mirror>
      </g>
    </Svg>
  </div>
}


export default Logo
