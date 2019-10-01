export function imageSkeletonSVG(withIcon = true, iconColor = '#eff0f1', backgroundColor = '#fff') {
  const icon = `
    <g transform="matrix(0.178117048346056, 0, 0, 0.16897600540723218, 161.5, 122.94999999999999)">
      <path d="M378.4,0H14.6C6.5,0,0,6.6,0,14.7v266.5c0,8.1,6.5,14.7,14.6,14.7h363.8c8.1,0,14.6-6.6,14.6-14.7V14.7
        C393,6.6,386.5,0,378.4,0z M352.5,255.9h-32.7l-74.3-89.1l-32.8,40.6l-82.4-108L74.1,255.9H40.8V40.7h311.7V255.9z"
        class="st0"
      />
      <circle cx="286.8" cy="98.9" r="24.6" class="st0"/>
    </g>`;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="Ebene_1" x="0px" y="0px" style="background-color:${backgroundColor}"
    version="1.1" viewBox="0 0 393 295.9" xml:space="preserve"
    >
    <style type="text/css">
        .st0{fill:${iconColor};}
    </style>
    ${withIcon ? icon : ''}
  </svg>`;
  return `data:image/svg+xml;base64,${window.btoa(svg)}`;
}
