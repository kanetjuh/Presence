import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import Manifest from './manifest.json';

import Settings from './components/Settings';
import { setActivity } from './rpc';
import { getActivity } from './activity';
import { get } from 'enmity/api/settings';

const Template: Plugin = {
   ...Manifest,

   onStart() {
      this.timeout = setTimeout(() => {
         if (get(Manifest.name, 'applicationId', undefined) && get(Manifest.name, 'name', undefined)) {
            setActivity(getActivity())
         }
      }, 30 * 1000)
   },

   onStop() {
      setActivity(undefined)
      clearTimeout(this.timeout)
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(Template);
