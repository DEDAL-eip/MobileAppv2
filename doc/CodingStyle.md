# CodingStyle

## Naming Conventions

A folder and sub folder name should always start with small letters and the files belongs the folders is always in pascal case.  
The term “PascalCase” comes from software development, it may describe any compound word in which the first letter of each word is capitalized.  

To name the components, we follow the pattern path based component naming, which include naming the component accordingly to its relative path to the folder components or to app.  
Basically, a component that is located at: components/common/Button.js would be named as Button.js. Component Name should follow pascal case.  
When the file is in a folder with same name, we don’t need to repeat the name.  
That means, components/user/form/Form.js, would be named as UserForm and not as UserFormForm.  

Include all the control in a single import belong to same module end with semicolon. There should be no space between two imports.

    import {ScrollView, View, TouchableOpacity, KeyboardAvoidingView, ListView, AsyncStorage, Alert } from ‘react-native’;

The class name should be declared as the file name that will be easy during importing and to maintain the standard declaration.
The object and variable declaration should always in camel case statement. If we use semicolon then use in all places at the end of statement or do not use.

    let textExample = “Hello World”;

    OR

    let textExample = “Hello World”

## Structuring Folder

All the components, globals, images, redux etc.. Should be written inside the app folder  
All the components except global components should be written inside the components folder under an app folder. A style for every page is written in its corresponding folder. Below, we can see the example of about screen  

All the global components, global styles, golbal data etc .. should be written in the globals folder under an app folder. Example of search bar is shown below. A search bar is written as a global component in the components folder under the globals folder, since it is used in many screens.  
Images should be there in the images folder under the app folder.

Global functions for API requests should be written in the request folder under the app folder  
If using redux, then the redux files should be written inside the store folder under the app folder  
The localization file is directly written in the app folder.

3. Putting imports in an order

a. React import
b. Library imports (Alphabetical order)
c. Absolute imports from the project (Alphabetical order)
d. Relative imports (Alphabetical order)
e. Import * as
f. Import ‘./<some file>.<some extension>
Each kind should be separated by an empty line. This makes your imports clean and easy to understand for all the components, 3rd-party libraries, and etc.

## Layout Conventions

    Always end a statement with a semicolon.
    We should create class component when we have to use state otherwise we should use functional component.
    Not allowing to set a state to be invoked on Render() of a React Component.
    If continuation lines are not indented automatic, indent them one tab stop (four spaces).
    Add at least one blank line between method and property definitions.
    There should be no line space between two similar looking statements or similar bunch of code applies to the same activity.

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(‘Ramu’);
    const [age, setAge] = useState(‘22’);

    And

    if (apiInProgress){
    setLoading(true);
    setName(null);
    }

• Object rest spread.
ES6 already supports array spread operator. You can use the same syntax for objects as well. So instead of writing Object.assign({},a,{b:2}), we can directly use {…a, b:2}.
It can make your React code much more beautiful and clean. Let me show you the code before and after using a spread operator.

    Before:
    function todoApp(state = initialState, action) {
    switch (action.type) {
    case SET_VISIBILITY_FILTER: return Object.assign({}, state, {
    visibilityFilter: action.filter
    });
    default: return state;
    }
    }

    After:

    function todoApp(state = initialState, action) {
    switch (action.type) {
    case SET_VISIBILITY_FILTER:
    return { …state, visibilityFilter: action.filter };
    default: return state;
    }
    }

## Commenting Conventions

    Place the comment on a separate line, not at the end of a line of code.
    Begin comment text with an uppercase letter.
    End comment text with a period.
    Insert one space between the comment delimiter (//) and the comment text.
    Attach comments to code only where necessary. This is not only in keeping with React best practices, it also serves two purposes at the same time:

    1. It’ll keep code visually clutter free.

    2. You’ll avoid a potential conflict between comment and code, if you happen to alter the code at some later point in time.

## Language Guidelines

Data types:A variable in ReactNative can contain any data. A variable can at one moment be a string and at another be a number

    //no error
    let message = “hello”;
    message = 123456;

A Number:The number type represents both integer and floating point numbers.There are many operations for numbers, e.g. multiplication * , division / , addition +, subtraction — , and so on.

    let n = 123;
    n = 123.123;

A string:A string in ReactNative must be surrounded by quotes.

    let str = “Hello”;
    let str2 = ‘Single quotes are ok too’;
    let phrase = `can embed ${str}`;

In ReactNative, there are 3 types of quotes.

    Double quotes: “Hello”.
    Single quotes: ‘Hello’.
    Backticks: `Hello`.

Double and single quotes are “simple” quotes. There’s no difference between them in ReactNative.

Backticks are “extended functionality” quotes. They allow us to embed variables and expressions into a string by wrapping them in ${…}, for example:

    let name = “John”;
    // embed a variable
    alert(`Hello, ${name}!`); // Hello, John!
    // embed an expression
    alert(`the result is ${1 + 2}`); // the result is 3

Put anything in there: a variable like name or an arithmetical expression like 1+ 2 or something more complex.Please note that this can only be done in back-ticks. Other quotes don’t have this embedding functionality!

A Boolean:The boolean type has only two values true and false.This type is commonly used to store yes/no values: true means “yes, correct”, and false means “no, incorrect”.For instance:

    let nameFieldChecked = true; // yes, name field is checked
    let ageFieldChecked = false; // no, age field is not checked

Boolean values also come as a result of comparisons:

    let isGreater = 4 > 1;
    alert( isGreater ); // true (the comparison result is “yes”)

Literals and properties:

We can immediately put some properties into {…} as “key: value” pairs:

    let user = { // an object
    name: “John”, // by key “name” store value “John”
    age: 30 // by key “age” store value 30
    };

Array:There are two syntaxes for creating an empty array:

    let arr = new Array();
    let arr = [];

Almost all the time, the second syntax is used. We can supply initial elements in the brackets:

    let fruits = [“Apple”, “Orange”, “Plum”];

Array elements are numbered, starting with zero.We can get an element by its number in square brackets:

    let fruits = [“Apple”, “Orange”, “Plum”];
    alert( fruits[0] ); // Apple
    alert( fruits[1] ); // Orange
    alert( fruits[2] ); // Plum

## Check internet connectivity

When you are building your React Native app that needs to pull assets or data from a server, there is a possibility that some users may use the application in an offline environment i.e., without an internet connection. There is a chance that the app might crash. So, for a better user experience, we can handle this by checking for an internet connection and notifying the user if not.

## Don’t Repeat Yourself

One of the basic principles of software development is Don’t Repeat Yourself. We must not write the same piece of code twice. Whenever you write the same piece of code twice, you must try to refactor it into something reusable, even if not completely.

You can create your own reusable components. For example, if your app contains multiple input fields, you can create a reusable <TextInput> component and use it across any screen within your app. Not only input fields, if your app contains multiple buttons, but you can also create a reusable <Button> component and use it anywhere within your app. Likewise, you can create any number of reusable components based on your app architecture.

## Avoid Inline Stylings

Using inline stylings is much harder to maintain if a change is to be made there will be hundreds of places in the code you will have to search and change unless all styles are clearly defined with unique class names in a CSS stylesheet. For any property you want to change, you would have to simply modify the corresponding class name properties in the stylesheet, all the divs that use the class name will be affected.

A well-defined stylesheet is extremely helpful while building complex React Native apps. Use React Native Stylesheet object to add styles specific to a certain component.

## Exception Handling in React Native Apps

One of the worst user experiences is using a mobile application that crashes with errors that aren’t handled gracefully. So, exception handling plays an important role in making your app run smoothly.

We use the try and catch blocks to handle exceptions within a React Native app.

The try…catch statement marks a block of statements to try, and specifies one or more responses should an exception be thrown. If an exception is thrown, the try…catch statement catches it.

The try…catch statement consists of a try block, which contains one or more statements, and a catch block, containing statements that specify what to do if an exception is thrown in the try block.

If your app consists of a block of code that may throw exceptions, you can handle that in a try-catch block like shown below.

try {
    throw new Error("Error");
} catch (error) {
    // handle Error
}

Not only this, there are other ways to handle exceptions. For those you can refer here.

## Perform the API Calls in componentDidMount()

In order to always have the correct flow of data and rendering the components, you must put all your API calls within the componentDidMount() life cycle method.

Using componentDidMount() makes it clear that the data won’t be loaded until after the initial render. This will assist you in setting up the initial state properly, so you don’t end up with an undefined state that results in errors.

If using react native hooks, then write your api calls within the useEffect

useEffect(()=>{//Your Api Call},[])

## Always Perform Both Local and Server Validations

Although, there are some validations or tests which only the server can validate, such as if the entered username or password exists in the database or if the entered email exists in the database. But it is a best practice that you always implement as much client validation as possible, such as entering the proper email format, empty field validation and also a minimum or maximum number of characters required. So, it is always preferable to perform both local and server validations.

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

Some actions require pushing a new screen to the application stack, while others require going to a screen you’ve loaded before. The push action adds a route on top of the stack and navigates forward to it. The push will always add on top, so a component can be mounted multiple times. This is important for the back action and for the data you want to present. For example, do you want to allow opening one profile from another? You need the push action, because you’re essentially loading the same component twice, with different data, and you want to be able to return to the previous profile with the back button. Navigating the screen, on the other hand, doesn’t have the stack of routes this type of routes is only meant to be used once and should not come up when we do back action for eg ( Login Screen )
19. Use a linter to make your code easier to review.

Follow strict linting rules. This in turn helps you write clean, consistent code.

## On editing external libraries

Sometimes you will want to change something in an external library. Do not edit it directly in the node_modules/ folder. That folder is supposed to be ignored by version control anyway, so if you change the code directly, your teammates will not see your changes. In addition, an npm update action will overwrite your modifications. The solution is to either fork the original repository and link your project to your own repository where you made the changes (and even make a PR to the original author if you want to help!), or if the library is very small (one file), you can copy/paste it as a component in your own project and then edit it locally.

## Lock Dependencies

If your package.json file has a dependency that looks like
"some-cool-library": "^0.4.2", you might want to remove the ^ character in order to lock the dependency on that specific version. This will ensure that you don’t import breaking changes from the new versions of the library into your project.

## Review your code before creating a pull/merge request.

Review your code at least once before creating a pull or merge request
