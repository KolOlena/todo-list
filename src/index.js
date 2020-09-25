import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'


ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render в качестве первого значения принимает елемент а не компонент
//названия компонентов надо писать с большой буквы
//все что с маленькой будет идти как хтмл тег
//компоненты возвращают елементы
// { loginBox } так можно вставлять только рект елементенты
//если у елемента будет значение null или undefined то этот елемент просто не отобразиться

//className
//</ App> и куда рендерить
