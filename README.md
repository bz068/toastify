# Toastify Clone

Toastify allows you to add notifications to your app with ease.


### creating new toast is as easy as:
```
 new Toast({
        text: 'lorem lorem lorem lorem',
        onClose: () => console.log('close'),
        autoClosable: true,
        showProgress: true,
        closeDelay: 10000,
        type: 'success',
        newestOnTop: true
    })
```
---
## proptypes
Property | Type | Default
--- | --- | --- | 
text | string | " "|
onClose | func | () => {} |
onOpen | func | () => {} |
autoClosable | bool | true |
showProgress | bool | true |
closeDelay | number | 5000 |
type | string | success |
theme | string | light |
newestOnTop | bool | false |
closeButton | func | () => {} |

### `type` can only be one of ['error', 'info', 'success', 'warn']
### `theme` can only be one of ['light', 'dark']
### `closeDelay` is in milliseconds
---

## close (X) button function

close button function can be set in two ways;
```
const toast = new Toast({
    text: 'lorem lorem lorem lorem',
    onClose: () => console.log('close'),
    autoClosable: true,
    showProgress: true,
    closeDelay: 100000,
    type: 'success',
    // pass it as property in the constructor
    closeButton: () => alert('Hello')
});

// set it statically 
toast.closeButton = () => alert('Hi')
```

---
## static function on toast object

`update()` 
 - update the existing options set while create an instance of Toast class.
 - params => `object`

use:
```
const toast = new Toast({
    text: 'lorem lorem lorem lorem',
    closeDelay: 100000,
    type: 'success',
});

setTimeout(() => {
    toast.update({ text: 'hello' })
}, 1000)

```



`remove()`
 - remove a toast from dom
 - params => `None`

 use: 

 ```
 const toast = new Toast({
    text: 'lorem lorem lorem lorem',
    closeDelay: 100000,
    type: 'success',
});

setTimeout(() => {
    toast.remove();
}, 1000)
 ```

---
