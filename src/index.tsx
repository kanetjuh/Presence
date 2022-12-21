import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import Manifest from './manifest.json';
import Settings from './components/Settings';
import { setActivity } from './rpc';
import { getActivity } from './activity';
import { get } from 'enmity/api/settings';

const Presence: Plugin = {
   ...Manifest,

   onStart() {
      let attempt = 0;
      const attempts = 3;
      const lateStartup = () => {
         try {
            attempt++;

            if (get(Manifest.name, 'applicationId', false) && get(Manifest.name, 'name', false)) {
               setActivity(getActivity())
            }

         } catch (err) {
            if (attempt < attempts) {
               setTimeout(lateStartup, attempt * 10000);
            } else {
               console.error(
                  `${Manifest.name} failed to start. Giving up.`
               );
            }
         }
      };

      setTimeout(() => {
         lateStartup();
      }, 300);
   },

   onStop() {
      setActivity(undefined)
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(Presence);
