- add image upload for doubts -- possible, should be easy
- add mutate for resolving doubts
- add option to resolve buddy request
- edit comments? -- should be easy!

- delete user uploaded files course/[courseId] -- figure out how to do that on client side. (would require client to have delete access)
- delete comment & sub-comment -- should be fine, direct delete if it has parentId, else delete all children
- change input forms bg colour on focus -- should be easy

- check if mongoDb.js can be replaced with dbConnect.js file -- idc, not priority - lets not break anything

<!-- for changing form onFocus :
styles={{
          input: {
            "&:focus-within": {
              borderColor: "red",
              backgroundColor: "pink"
            }
          }
        }} -->

replace all errornotifcaiton(error.error) with something went wrong
