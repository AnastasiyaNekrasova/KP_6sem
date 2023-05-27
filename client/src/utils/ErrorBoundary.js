import React from 'react';

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    statusCode: null,
  };

  static getDerivedStateFromError(error) {
    // Обновляем состояние компонента, если произошла ошибка
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Здесь вы можете отправить отчет об ошибке на сервер
    // или выполнить другие необходимые действия
  }

  static getDerivedStateFromProps(props) {
    const { location } = props;
    const statusCode = new URLSearchParams(location.search).get('status');
    
    // Получаем статус код из параметра запроса (?status=404)
    return { statusCode: statusCode };
  }

  componentDidUpdate(prevProps) {
    const { statusCode } = this.state;

    // Проверяем, изменился ли статус код при переходе на новую страницу
    if (prevProps.location.pathname !== this.props.location.pathname) {
      // Если статус код существует, перенаправляем пользователя на страницу ошибки
      if (statusCode) {
        this.props.navigate('/error?status=' + statusCode);
      }
    }
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      // Если произошла ошибка, отображаем компонент ошибки
      return <ErrorPage />;
    }

    // Если ошибок нет, отображаем дочерние компоненты
    return this.props.children;
  }
}
