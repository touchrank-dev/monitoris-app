import { combineReducers } from 'redux';
import App from 'reducers/App';
import InstanceStates from 'reducers/InstanceStates';
import Objects from 'reducers/Objects';
import Session from 'reducers/Session';
import Settings from 'reducers/Settings';
import Thread from 'reducers/Thread';

export default combineReducers({
    alerts: Objects('alerts'),
    app: App(),
    instances: Objects('instances'),
    instanceStates: InstanceStates(),
    session: Session(),
    settings: Settings(),
    thread: Thread()
});