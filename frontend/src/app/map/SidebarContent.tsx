export default function SidebarContent() {
  return (
    <div id="sidebar-content" className="p-4 overflow-y-auto h-full z-10">
      <h2 className="sidebar-header">Load from file</h2>
      {/*<input title="Load from File" type="file" accept=".gpx" />*/}
      <p>
        This is a web app for viewing GPX files, built with{" "}
        <a
          href="https://reactjs.org/"
          target="_blank"
          rel="noreferrer noopener"
        >
          React
        </a>{" "}
        and{" "}
        <a href="https://mapbox.com/" target="_blank" rel="noreferrer noopener">
          Mapbox
        </a>
        .
      </p>
      <p>
        It&apos;s fullscreen, and features a nav header, fixed-width sidebar,
        and main map area.
      </p>
      <p>
        This sidebar will scroll if its content becomes longer than the map.
      </p>
      <p>
        On mobile devices, the orientation of the sidebar and map containers
        changes to a column, with the map on top taking 50% of the height, and
        the sidebar on the bottom.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        vestibulum ipsum id vulputate hendrerit. Curabitur commodo ut tellus id
        convallis. Curabitur vel enim nulla. Nam cursus quis lorem in pharetra.
        Fusce non sem eu nulla laoreet tristique. Nullam varius in sem ornare
        facilisis. Morbi justo dui, accumsan sed semper et, accumsan id tellus.
        Morbi imperdiet, neque bibendum mollis pellentesque, ipsum urna
        imperdiet velit, tempor rutrum diam ligula sit amet ex. Sed posuere quis
        nisl nec tincidunt. Nullam ut scelerisque magna. Cras ac bibendum elit,
        in molestie lacus.
      </p>
      <p>
        Sed fermentum mattis orci, sit amet maximus justo fermentum a. Etiam et
        blandit nisl. Nulla imperdiet enim tellus, at rhoncus enim blandit at.
        Praesent venenatis pharetra elit, nec ornare tortor malesuada et. Donec
        pharetra orci vel ipsum mollis mollis ut non nisl. Aliquam laoreet,
        lorem vitae egestas mattis, massa dolor iaculis nunc, ac mollis lorem
        metus eget est. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Morbi consequat tincidunt tortor in
        dignissim. Phasellus maximus vel nibh id laoreet. Fusce in fringilla
        tortor. Sed sit amet purus lobortis, commodo libero eu, cursus arcu.
        Fusce tristique congue magna. Integer elementum urna non arcu aliquet,
        id sodales diam pharetra. Quisque id enim a purus mollis convallis nec
        sed dolor. Sed volutpat porta malesuada.
      </p>
    </div>
  );
}
