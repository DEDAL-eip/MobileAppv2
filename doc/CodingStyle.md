# CodingStyle

## Table of contents

## Naming Conventions

1. A folder and sub folder name should always start with small letters.  
2. The files belongs the folders like Screens and Components are always in pascal case (e.g: "PascalCase").  
3. When a file is in a folder with same name, we don’t need to repeat the name (components/user/form/Form.js -> UserForm not UserFormForm).  
4. Include all the control in a single import belong to same module end with semicolon.  
(e.g: `import { ScrollView, View, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, Alert } from ‘react-native’;`)
5. The class name should be declared as the file name.
6. The object and variable declaration should always in camel case statement (e.g: "textExample").

## Structuring Folder

1. All the components, globals, images, redux etc.. Should be written inside the app folder  
2. All the components except global components should be written inside the components folder under an app folder.  
3. A style for every page is written in its corresponding folder.  
4.All the global components, global styles, global data etc... should be written in the globals folder under an app folder.  
5. A search bar is written as a global component in the components folder under the globals folder, since it is used in many screens.  
6. Images should be in the images folder under the app folder.  
7. Global functions for API requests should be written in the request folder under the app folder.  
8. Redux files should be written inside the store folder under the app folder.  
9. The localization file is directly written in the app folder.  

## Putting imports in an order

1. `React imports`  
2. `Library imports (Alphabetical order)`  
3. `Absolute imports from the project (Alphabetical order)`  
4. `Relative imports (Alphabetical order)`  
5. `Import * as`  
6. `Import ‘./<some file>.<some extension>`  

Each kind should be separated by an empty line.  

## Layout Conventions

1. We should create class component when we have to use state otherwise we should use functional component.  
2. Not allowing to set a state to be invoked on Render() of a React Component.  
3. If continuation lines are not indented automatic, indent them one tab stop (four spaces).  
4. Add at least one blank line between method and property definitions.  
5. There should be no line space between two similar looking statements or similar bunch of code applies to the same activity.  
```jsx
const [loading, setLoading] = useState(false);
const [name, setName] = useState(‘Ramu’);
const [age, setAge] = useState(‘22’);

// And

if (apiInProgress){
    setLoading(true);
    setName(null);
}
```
6. Object rest spread. ES6 already supports array spread operator. You can use the same syntax for objects as well.
So instead of writing `Object.assign({},a,{b:2})`, we can directly use `{…a, b:2}`.  
```jsx
//Before:
function todoApp(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER: return Object.assign({}, state, {
            visibilityFilter: action.filter
        });
        default: return state;
    }
}
```
```jsx
//After:
function todoApp(state = initialState, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return { …state, visibilityFilter: action.filter };
        default: return state;
    }
}
```

## Commenting Conventions

1. Place the comment on a separate line, not at the end of a line of code.  
2. Begin comment text with an uppercase letter.  
3. End comment text with a period.  
4. Insert one space between the comment delimiter (//) and the comment text.  
5. Attach comments to code only where necessary.  

## Code learance

1. We must not write the same piece of code twice.  
2. Avoid Inline Stylings.  
3. Use React Native Stylesheet object to add styles specific to a certain component.

## Exception Handling in React Native Apps

One of the worst user experiences is using a mobile application that crashes with errors that aren’t handled gracefully. So, exception handling plays an important role in making your app run smoothly.

1. We use the try and catch blocks to handle exceptions.  
```jsx
try {
    throw new Error("Error");
} catch (error) {
    // handle Error
}
```

## Perform the API Calls in componentDidMount()

In order to always have the correct flow of data and rendering the components, you must put all your API calls within the componentDidMount() life cycle method.

Using componentDidMount() makes it clear that the data won’t be loaded until after the initial render. This will assist you in setting up the initial state properly, so you don’t end up with an undefined state that results in errors.

If using react native hooks, then write your api calls within the useEffect  
`useEffect(()=>{//Your Api Call},[])`  

## Always Perform Both Local and Server Validations

Although, there are some validations or tests which only the server can validate, such as if the entered username or password exists in the database or if the entered email exists in the database.  
But it is a best practice that you always implement as much client validation as possible, such as entering the proper email format, empty field validation and also a minimum or maximum number of characters required.  
So, it is always preferable to perform both local and server validations.

## Make Sure Your App is Responsive

You must always make sure that the app you are building is responsive, meaning it is consistent across different devices and platforms.

## Add Loading spinners While Fetching The Data Or Waiting For an API Response

This is something that is very easy to implement. Adding Loading Indicators makes your app look more responsive and professional to users.

## Don’t put logs in the release build

Having many console.log statements can slow your app down, especially if you are using logging libraries such as redux-logger. Be sure to disable all logs (manually or with a script) when doing a release build.

## DO use Safe Area View

If you want your app to look good on every iOS device you should use SafeAreaView which provides automatic padding when a view intersects with a safe area (notch, status bar, home indicator).

## DO use Keyboard Avoiding View

It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its height, position, or bottom padding based on the keyboard height.

## DO remember the difference in pushing the screen and navigating the screen

Some actions require pushing a new screen to the application stack, while others require going to a screen you’ve loaded before.  
The push action adds a route on top of the stack and navigates forward to it.  
The push will always add on top, so a component can be mounted multiple times.  
This is important for the back action and for the data you want to present.  
For example, do you want to allow opening one profile from another?  
You need the push action, because you’re essentially loading the same component twice, with different data, and you want to be able to return to the previous profile with the back button.  
Navigating the screen, on the other hand, doesn’t have the stack of routes this type of routes is only meant to be used once and should not come up when we do back action for eg ( Login Screen )

## Use a linter to make your code easier to review.

Follow strict linting rules. This in turn helps you write clean, consistent code.

## On editing external libraries

Sometimes you will want to change something in an external library.  
Do not edit it directly in the node_modules/ folder.  
That folder is supposed to be ignored by version control anyway, so if you change the code directly, your teammates will not see your changes.  
In addition, an npm update action will overwrite your modifications.  
The solution is to either fork the original repository and link your project to your own repository where you made the changes (and even make a PR to the original author if you want to help!), or if the library is very small (one file), you can copy/paste it as a component in your own project and then edit it locally.

## Lock Dependencies

If your package.json file has a dependency that looks like `"some-cool-library": "^0.4.2",` you might want to remove the ^ character in order to lock the dependency on that specific version.  
This will ensure that you don’t import breaking changes from the new versions of the library into your project.

## Review your code before creating a pull/merge request.

Review your code at least once before creating a pull or merge request
