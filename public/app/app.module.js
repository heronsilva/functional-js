import { log, timeout, retry } from './utils/promise-helper.js'
import { notasService as service } from './nota/service.js'
import { takeUntil, debounceTime, partialize, pipe } from './utils/operators.js'
import { EventEmitter } from './utils/event-emitter.js'

import './utils/array-helper.js'

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
)

const action = operations(() =>
  retry(3, 3000, () => timeout(200, service.sumItems('2143')))
    .then(total => EventEmitter.emit('totalItems', total))
    .catch(log)
)

document
  .querySelector('#myButton')
  .onclick = action
