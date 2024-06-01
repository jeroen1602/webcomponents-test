import './assets/main.css'

import {defineCustomElement} from 'vue'
import VueBadge from './components/Badge.vue';

const styles = [`.badge {
  background-color: red;
  border-radius: 50%;
  padding: 0.25rem;
  display: inline;
  color: white;
}`];

const Badge = defineCustomElement({ ...VueBadge, styles });

customElements.define('vue-badge', Badge);
