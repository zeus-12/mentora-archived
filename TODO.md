--- EASY, BUT NOT NECESSARY ---

- have a custom component for input fields -- pretty much every ui element from mantine which is used frequently
- change input forms bg colour on focus -- should be easy
- create custom error page for user signing w.o smail -- should be easy

<!-- for changing form onFocus :
styles={{
          input: {
            "&:focus-within": {
              borderColor: "red",
              backgroundColor: "pink"
            }
          }
        }} -->

--- EASY - PRIORITY----

- add image upload for doubts -- possible, should be easy
- add option to resolve buddy request
- edit comments? -- should be easy!
- delete comment & sub-comment -- should be fine, direct delete if it has parentId, else delete all children

--- MEDIUM ---

- implement fuzzy search for search

--- HARD ---

- delete user uploaded files course/[courseId] -- figure out how to do that on client side. (would require client to have delete access)
- get sas token from backend, once it expires
