import { useQuasar } from "quasar";

// quasar device deetected
const device = () => {
  const $q = useQuasar();
  return $q.platform.is;
};

// platform name for application
const platformName = () => `${device.platform}-${device.name}`;

export { device, platformName };
