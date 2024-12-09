import { useMap } from "react-leaflet";
import { useEffect } from "react";

const FullscreenControl = () => {
  const map = useMap();

  useEffect(() => {
    // Define a custom control
    const FullscreenControl = L.Control.extend({
      options: {
        position: 'topleft' // You can change the position here
      },

      onAdd: function (map) {
        const container = L.DomUtil.create('div', 'leaflet-bar fullscreen-control');
        const button = L.DomUtil.create('a', '', container);
        button.title = 'Toggle Fullscreen';
        button.innerHTML = '&#x26F6;'; // Unicode character for fullscreen icon

        // Prevent click events from propagating to the map
        L.DomEvent.disableClickPropagation(container);

        // Add click handler
        L.DomEvent.on(button, 'click', function (e) {
          e.stopPropagation();
          toggleFullscreen();
        });

        return container;
      }
    });

    // Instantiate the control and add it to the map
    const fullscreenControl = new FullscreenControl();
    map.addControl(fullscreenControl);

    // Fullscreen toggle function
    const toggleFullscreen = () => {
      const mapContainer = map.getContainer();
      if (!document.fullscreenElement) {
        // Enter fullscreen
        if (mapContainer.requestFullscreen) {
          mapContainer.requestFullscreen();
        } else if (mapContainer.mozRequestFullScreen) {
          /* Firefox */
          mapContainer.mozRequestFullScreen();
        } else if (mapContainer.webkitRequestFullscreen) {
          /* Chrome, Safari & Opera */
          mapContainer.webkitRequestFullscreen();
        } else if (mapContainer.msRequestFullscreen) {
          /* IE/Edge */
          mapContainer.msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari & Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    };

    // Cleanup on unmount
    return () => {
      map.removeControl(fullscreenControl);
    };
  }, [map]);

  return null;
}
export default FullscreenControl
