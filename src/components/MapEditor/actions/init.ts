import { mapStatus, transformStatus, uploadInfoStatus } from '../store';
import { registerSnapshot, loadSnapshot } from './snapshot';
import { initializeKeyboardEvents } from './keyboard';
import { loadMapData } from './ajax';

const SNAPSHOT_MAP_KEY = '23earth.snapshot.map'
const SNAPSHOT_TRANSFORM_KEY = '23earth.snapshot.pos'
const SNAPSHOT_UPLOAD_KEY = '23earth.snapshot.upload'

export async function initializeMap(){
    const dataMap = await loadMapData()
    loadSnapshot(SNAPSHOT_MAP_KEY, mapStatus)
    transformStatus.setSize(
        dataMap.width, dataMap.height, 
        document.body.clientWidth, document.body.clientHeight
    )
    if(!loadSnapshot(SNAPSHOT_TRANSFORM_KEY, transformStatus)){
        transformStatus.initStatus()
    }
    loadSnapshot(SNAPSHOT_UPLOAD_KEY, uploadInfoStatus)
    registerSnapshot(SNAPSHOT_MAP_KEY, mapStatus)
    registerSnapshot(SNAPSHOT_TRANSFORM_KEY, transformStatus)
    registerSnapshot(SNAPSHOT_UPLOAD_KEY, uploadInfoStatus)
    initializeKeyboardEvents()
}
