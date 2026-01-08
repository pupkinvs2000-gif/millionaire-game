// Игровые вопросы с разными уровнями сложности
const questions = [
    // Вопросы 1-5 (легкие)
    {
        question: "Какое ТС дешевле стульев Козлова?",
        answers: ["A: танк", "B: Синий логан", "C: 777", "D: вертолет Ильина"],
        correct: 1,
        level: 1
    },
    {
        question: "Куда Виталя поедет после работы?",
        answers: ["A: Люська", "B: Катька", "C: Машка", "D: Юра"],
        correct: 2,
        level: 1
    },
    {
        question: "Самое неприятное приветствие?",
        answers: ["A: Здорова заебал", "B: Приветики пистолетики", "C:  Мииииууу", "D: Здравствуйте"],
        correct: 2,
        level: 1
    },
    {
        question: "Кто покупает таблетки для потенции?",
        answers: ["A: Вова Глазков", "B: Бердников", "C: Чалов", "D: Плетнев"],
        correct: 2,
        level: 1
    },
    {
        question: "У кого \"саааамааая маленькая\" зарплата в ВММ?",
        answers: ["A: Татьяна Юрьевна", "B: Любовь Ивановна", "C: Люся", "D: Цымбал"],
        correct: 3,
        level: 1
    },
    // Вопросы 6-10 (средние)
    {
        question: "Кто твоя друлега?",
        answers: ["A: Катя", "B: Аня", "C: Виталя", "D: Татьяна Юрьевна"],
        correct: 1,
        level: 2
    },
    {
        question: "Кто спонсировал Шерера?",
        answers: ["A: Катя", "B: Ксюша", "C: Руся", "D: Ложкина"],
        correct: 0,
        level: 2
    },
    {
        question: "Кто написал роман 'Война и мир'?",
        answers: ["A: Достоевский", "B: Толстой", "C: Чехов", "D: Тургенев"],
        correct: 1,
        level: 2
    },
    {
        question: "Какая самая высокая гора в мире?",
        answers: ["A: К2", "B: Эверест", "C: Килиманджаро", "D: Монблан"],
        correct: 1,
        level: 2
    },
    {
        question: "В какой стране находится Великая Китайская стена?",
        answers: ["A: Япония", "B: Китай", "C: Индия", "D: Монголия"],
        correct: 1,
        level: 2
    },
    // Вопросы 11-15 (сложные)
    {
        question: "Какой композитор написал оперу 'Кармен'?",
        answers: ["A: Моцарт", "B: Бизе", "C: Чайковский", "D: Вагнер"],
        correct: 1,
        level: 3
    },
    {
        question: "Какая молекула переносит кислород в крови?",
        answers: ["A: Гемоглобин", "B: Глюкоза", "C: Инсулин", "D: Адреналин"],
        correct: 0,
        level: 3
    },
    {
        question: "В каком году человек впервые ступил на Луну?",
        answers: ["A: 1967", "B: 1969", "C: 1971", "D: 1973"],
        correct: 1,
        level: 3
    },
    {
        question: "Какой математик доказал теорему о неполноте?",
        answers: ["A: Эйнштейн", "B: Гаусс", "C: Гёдель", "D: Пифагор"],
        correct: 2,
        level: 3
    },
    {
        question: "Какой город является столицей Австралии?",
        answers: ["A: Сидней", "B: Мельбурн", "C: Канберра", "D: Брисбен"],
        correct: 2,
        level: 3
    }
];

// Призы по уровням
const prizes = [
    100, 200, 300, 500, 1000,
    2000, 4000, 8000, 16000, 32000,
    64000, 125000, 250000, 500000, 1000000
];

// Состояние игры
let gameState = {
    currentQuestion: 0,
    score: 0,
    lifelines: {
        fiftyFifty: true,
        phone: true,
        audience: true
    },
    gameActive: false,
    usedQuestions: []
};

// DOM элементы
const elements = {
    questionText: document.getElementById('question-text'),
    questionNumber: document.getElementById('current-question'),
    answerBtns: {
        A: document.getElementById('answer-A'),
        B: document.getElementById('answer-B'),
        C: document.getElementById('answer-C'),
        D: document.getElementById('answer-D')
    },
    answerTexts: {
        A: document.getElementById('text-A'),
        B: document.getElementById('text-B'),
        C: document.getElementById('text-C'),
        D: document.getElementById('text-D')
    },
    lifeline5050: document.getElementById('lifeline-5050'),
    lifelinePhone: document.getElementById('lifeline-phone'),
    lifelineAudience: document.getElementById('lifeline-audience'),
    btnStartGame: document.getElementById('btn-start-game'),
    btnTakeMoney: document.getElementById('btn-take-money'),
    btnRestart: document.getElementById('btn-restart'),
    resultModal: document.getElementById('result-modal'),
    hintModal: document.getElementById('hint-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalMessage: document.getElementById('modal-message'),
    hintTitle: document.getElementById('hint-title'),
    hintMessage: document.getElementById('hint-message'),
    btnCloseHint: document.getElementById('btn-close-hint'),
    qrContainer: document.getElementById('qr-container'),
    qrCode: document.getElementById('qrcode'),
    qrText: document.getElementById('qr-text')
};

// Инициализация игры
function initGame() {
    gameState = {
        currentQuestion: 0,
        score: 0,
        lifelines: {
            fiftyFifty: true,
            phone: true,
            audience: true
        },
        gameActive: false,
        usedQuestions: []
    };
    
    // Сброс кнопок подсказок
    elements.lifeline5050.disabled = false;
    elements.lifelinePhone.disabled = false;
    elements.lifelineAudience.disabled = false;
    
    // Сброс призов
    for (let i = 1; i <= 15; i++) {
        const prize = document.getElementById(`prize-${i}`);
        prize.classList.remove('active', 'won', 'lost');
    }
    
    // Установка активного приза
    document.getElementById('prize-1').classList.add('active');
    
    // Скрытие модальных окон
    elements.resultModal.classList.remove('active');
    elements.hintModal.classList.remove('active');
    elements.qrContainer.style.display = 'none';
    
    elements.btnStartGame.style.display = 'block';
    elements.btnTakeMoney.style.display = 'none';
}

// Получение случайного вопроса нужного уровня
function getRandomQuestion(level) {
    const levelQuestions = questions.filter(q => q.level === level && !gameState.usedQuestions.includes(q.question));
    
    if (levelQuestions.length === 0) {
        // Если все вопросы уровня использованы, используем любой вопрос уровня
        const allLevelQuestions = questions.filter(q => q.level === level);
        const randomIndex = Math.floor(Math.random() * allLevelQuestions.length);
        return allLevelQuestions[randomIndex];
    }
    
    const randomIndex = Math.floor(Math.random() * levelQuestions.length);
    const question = levelQuestions[randomIndex];
    gameState.usedQuestions.push(question.question);
    return question;
}

// Определение уровня вопроса по номеру
function getQuestionLevel(questionNum) {
    if (questionNum <= 5) return 1;
    if (questionNum <= 10) return 2;
    return 3;
}

// Начало игры
function startGame() {
    gameState.gameActive = true;
    gameState.currentQuestion = 0;
    gameState.usedQuestions = [];
    
    elements.btnStartGame.style.display = 'none';
    elements.btnTakeMoney.style.display = 'block';
    
    loadQuestion();
}

// Загрузка вопроса
function loadQuestion() {
    const questionNum = gameState.currentQuestion + 1;
    const level = getQuestionLevel(questionNum);
    const question = getRandomQuestion(level);
    
    // Обновление номера вопроса
    elements.questionNumber.textContent = questionNum;
    
    // Обновление текста вопроса
    elements.questionText.textContent = question.question;
    
    // Обновление вариантов ответов
    const labels = ['A', 'B', 'C', 'D'];
    labels.forEach((label, index) => {
        elements.answerTexts[label].textContent = question.answers[index].substring(3);
        const btn = elements.answerBtns[label];
        btn.disabled = false;
        btn.classList.remove('correct', 'wrong', 'hidden');
    });
    
    // Обновление активного приза
    updatePrizeLadder(questionNum);
    
    // Сохранение текущего вопроса
    gameState.currentQuestionData = question;
}

// Обновление лестницы призов
function updatePrizeLadder(currentNum) {
    for (let i = 1; i <= 15; i++) {
        const prize = document.getElementById(`prize-${i}`);
        prize.classList.remove('active');
        
        if (i === currentNum) {
            prize.classList.add('active');
        } else if (i < currentNum) {
            prize.classList.add('won');
        }
    }
}

// Проверка ответа
function checkAnswer(selectedIndex) {
    const question = gameState.currentQuestionData;
    const labels = ['A', 'B', 'C', 'D'];
    
    // Отключение всех кнопок
    Object.values(elements.answerBtns).forEach(btn => {
        btn.disabled = true;
    });
    
    // Показать правильный ответ
    setTimeout(() => {
        const correctLabel = labels[question.correct];
        const selectedLabel = labels[selectedIndex];
        
        elements.answerBtns[correctLabel].classList.add('correct');
        
        if (selectedIndex !== question.correct) {
            elements.answerBtns[selectedLabel].classList.add('wrong');
            // Неправильный ответ - конец игры
            setTimeout(() => {
                endGame(false);
            }, 2000);
        } else {
            // Правильный ответ
            gameState.currentQuestion++;
            gameState.score = prizes[gameState.currentQuestion - 1];
            
            console.log(`Правильный ответ! Текущий вопрос: ${gameState.currentQuestion}/15`);
            
            if (gameState.currentQuestion === 15) {
                // Выиграл миллион!
                console.log('🎉 ПОБЕДА! Все 15 вопросов пройдены! Генерируем QR код...');
                setTimeout(() => {
                    endGame(true);
                }, 2000);
            } else {
                // Следующий вопрос
                setTimeout(() => {
                    loadQuestion();
                }, 2000);
            }
        }
    }, 500);
}

// Подсказка 50/50
function useFiftyFifty() {
    if (!gameState.lifelines.fiftyFifty || !gameState.gameActive) return;
    
    const question = gameState.currentQuestionData;
    const labels = ['A', 'B', 'C', 'D'];
    const correctLabel = labels[question.correct];
    
    // Находим два неправильных ответа для скрытия
    const wrongAnswers = labels.filter((label, index) => 
        index !== question.correct
    );
    
    // Скрываем два случайных неправильных ответа
    const toHide = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2);
    toHide.forEach(label => {
        elements.answerBtns[label].classList.add('hidden');
    });
    
    gameState.lifelines.fiftyFifty = false;
    elements.lifeline5050.disabled = true;
    
    showHint('50/50', 'Два неправильных ответа были скрыты!');
}

// Подсказка звонок другу
function usePhone() {
    if (!gameState.lifelines.phone || !gameState.gameActive) return;
    
    const question = gameState.currentQuestionData;
    const labels = ['A', 'B', 'C', 'D'];
    const correctLabel = labels[question.correct];
    
    // Имитация звонка другу
    const confidence = Math.random();
    let message;
    
    if (confidence > 0.7) {
        // Друг уверен
        message = `Друг говорит: "Я уверен, что правильный ответ - ${correctLabel}. Вероятность около 85%."`;
    } else if (confidence > 0.4) {
        // Друг не уверен
        message = `Друг говорит: "Я думаю, что это может быть ${correctLabel}, но не уверен на 100%. Вероятность около 60%."`;
    } else {
        // Друг не знает
        const randomLabel = labels[Math.floor(Math.random() * 4)];
        message = `Друг говорит: "Честно говоря, я не уверен, но может быть ${randomLabel}. Вероятность около 40%."`;
    }
    
    gameState.lifelines.phone = false;
    elements.lifelinePhone.disabled = true;
    
    showHint('Звонок другу', message);
}

// Подсказка помощь зала
function useAudience() {
    if (!gameState.lifelines.audience || !gameState.gameActive) return;
    
    const question = gameState.currentQuestionData;
    const labels = ['A', 'B', 'C', 'D'];
    const correctLabel = labels[question.correct];
    
    // Генерируем результаты голосования зала
    const percentages = [0, 0, 0, 0];
    
    // Правильному ответу даем высокий процент (50-70%)
    percentages[question.correct] = 50 + Math.floor(Math.random() * 21);
    
    // Остальные проценты распределяем между неправильными ответами
    let remaining = 100 - percentages[question.correct];
    for (let i = 0; i < 4; i++) {
        if (i !== question.correct) {
            const percent = Math.floor(remaining / (3 - (question.correct < i ? 1 : 0)) * (0.3 + Math.random() * 0.4));
            percentages[i] = percent;
            remaining -= percent;
        }
    }
    
    // Убеждаемся, что сумма = 100
    percentages[question.correct] += remaining;
    
    let message = 'Результаты голосования зала:\n';
    labels.forEach((label, index) => {
        message += `${label}: ${percentages[index]}%\n`;
    });
    
    gameState.lifelines.audience = false;
    elements.lifelineAudience.disabled = true;
    
    showHint('Помощь зала', message);
}

// Показать подсказку
function showHint(title, message) {
    elements.hintTitle.textContent = title;
    elements.hintMessage.textContent = message;
    elements.hintModal.classList.add('active');
}

// Забрать деньги
function takeMoney() {
    if (!gameState.gameActive || gameState.currentQuestion === 0) return;
    
    const currentPrize = prizes[gameState.currentQuestion - 1];
    endGame(true, `Вы решили забрать деньги? Да сейчас прям. Давай играй пока не победишь! ${formatMoney(currentPrize)}!`);
}

// Генерация QR кода
function generateQRCode(text) {
    try {
        // Проверяем наличие библиотеки
        if (typeof QRCode === 'undefined') {
            console.error('Библиотека QRCode не загружена!');
            if (elements.qrCode) {
                elements.qrCode.innerHTML = '<p style="color: red; padding: 20px;">Ошибка: Библиотека QRCode не найдена. Проверьте подключение к интернету.</p>';
            }
            return;
        }
        
        // Проверяем наличие элемента
        if (!elements.qrCode) {
            console.error('Элемент qrCode не найден!');
            return;
        }
        
        console.log('Начинаем генерацию QR кода для текста:', text);
        
        // Очищаем предыдущий QR код
        elements.qrCode.innerHTML = '';
        
        // Используем альтернативный способ - генерируем напрямую в элемент
        QRCode.toCanvas(elements.qrCode, text, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            errorCorrectionLevel: 'H'
        }, function (error) {
            if (error) {
                console.error('Ошибка генерации QR кода:', error);
                elements.qrCode.innerHTML = '<p style="color: red; padding: 20px;">Ошибка генерации QR кода: ' + error.message + '</p>';
            } else {
                console.log('✅ QR код успешно сгенерирован!');
                // Убеждаемся, что canvas виден
                const canvas = elements.qrCode.querySelector('canvas');
                if (canvas) {
                    canvas.style.display = 'block';
                    canvas.style.maxWidth = '100%';
                    canvas.style.height = 'auto';
                }
            }
        });
    } catch (error) {
        console.error('Исключение при генерации QR кода:', error);
        if (elements.qrCode) {
            elements.qrCode.innerHTML = '<p style="color: red; padding: 20px;">Ошибка: ' + error.message + '</p>';
        }
    }
}

// Окончание игры
function endGame(won, customMessage = null) {
    gameState.gameActive = false;
    
    // Скрываем QR код по умолчанию
    elements.qrContainer.style.display = 'none';
    
    let title, message;
    
    if (won) {
        console.log('Проверка победы. currentQuestion:', gameState.currentQuestion);
        if (gameState.currentQuestion === 15) {
            title = '🎉 ПОЗДРАВЛЯЕМ! 🎉';
            message = 'Вы ответили на все 15 вопросов правильно!';
            
            // Проверяем наличие элементов
            if (!elements.qrContainer) {
                console.error('❌ Элемент qrContainer не найден!');
            }
            if (!elements.qrCode) {
                console.error('❌ Элемент qrCode не найден!');
            }
            if (!elements.qrText) {
                console.error('❌ Элемент qrText не найден!');
            }
            if (typeof QRCode === 'undefined') {
                console.error('❌ Библиотека QRCode не загружена!');
            }
            
            // Генерируем QR код как главный приз
            console.log('✅ Генерация QR кода для победителя...');
            const qrText = generateQRCodeText();
            console.log('📝 Текст для QR кода:', qrText);
            
            // Показываем контейнер с QR кодом
            if (elements.qrContainer) {
                elements.qrContainer.style.display = 'block';
                console.log('✅ Контейнер QR кода отображен');
            }
            if (elements.qrText) {
                elements.qrText.textContent = 'Отсканируйте QR код, чтобы получить ваш главный приз!';
            }
            
            // Генерируем QR код с небольшой задержкой, чтобы убедиться, что элемент виден
            setTimeout(() => {
                console.log('⏳ Запуск генерации QR кода...');
                generateQRCode(qrText);
            }, 100);
        } else {
            title = 'Поздравляем!';
            message = customMessage || `Вы выиграли ${formatMoney(gameState.score)}!`;
        }
        
        // Отметить выигранные призы
        for (let i = 1; i <= gameState.currentQuestion; i++) {
            document.getElementById(`prize-${i}`).classList.add('won');
        }
    } else {
        title = 'Игра окончена';
        
        // Определяем гарантированный приз
        let guaranteedPrize = 0;
        if (gameState.currentQuestion >= 10) {
            guaranteedPrize = prizes[9]; // 32 000 ₽
        } else if (gameState.currentQuestion >= 6) {
            guaranteedPrize = prizes[5]; // 2 000 ₽
        }
        
        message = guaranteedPrize > 0 
            ? `Неправильный ответ! Но вы гарантированно забираете ${formatMoney(guaranteedPrize)}!`
            : `Неправильный ответ! Вы проиграли!`;
        
        // Отметить проигранные призы
        for (let i = gameState.currentQuestion + 1; i <= 15; i++) {
            document.getElementById(`prize-${i}`).classList.add('lost');
        }
    }
    
    elements.modalTitle.textContent = title;
    elements.modalMessage.textContent = message;
    elements.resultModal.classList.add('active');
}

// Генерация текста для QR кода
function generateQRCodeText() {
    // Можно настроить, что будет в QR коде
    // Варианты:
    
    // 1. Поздравление
    const congratulations = `🎉 ПОЗДРАВЛЯЕМ! 🎉
    
Вы стали миллионером в игре "Кто хочет стать миллионером?"
    
Вы успешно ответили на все 15 вопросов!
    
Дата: ${new Date().toLocaleDateString('ru-RU')}
Время: ${new Date().toLocaleTimeString('ru-RU')}
    
Это ваш главный приз! 🏆`;
    
    // 2. Ссылка на сайт (можно изменить на свой)
    const websiteLink = 'https://github.com';
    
    // 3. Специальный код
    const specialCode = `MILLIONAIRE-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    // Выберите что использовать (можно вернуть любой вариант)
    // return congratulations; // Текст поздравления
    // return websiteLink;     // Ссылка на сайт
    return `ПОЗДРАВЛЯЕМ! Вы выиграли главный приз! Извозчик Евгения 89122892000!\n\nКод: ${specialCode}\n\nОтсканируйте этот код для получения приза!`; // return congratulations
}

// Форматирование денег
function formatMoney(amount) {
    return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
}

// Обработчики событий
elements.btnStartGame.addEventListener('click', startGame);
elements.btnRestart.addEventListener('click', () => {
    elements.resultModal.classList.remove('active');
    initGame();
});

elements.btnTakeMoney.addEventListener('click', takeMoney);

elements.btnCloseHint.addEventListener('click', () => {
    elements.hintModal.classList.remove('active');
});

// Обработчики ответов
Object.keys(elements.answerBtns).forEach((label, index) => {
    elements.answerBtns[label].addEventListener('click', () => {
        if (gameState.gameActive) {
            checkAnswer(index);
        }
    });
});

// Обработчики подсказок
elements.lifeline5050.addEventListener('click', useFiftyFifty);
elements.lifelinePhone.addEventListener('click', usePhone);
elements.lifelineAudience.addEventListener('click', useAudience);

// Закрытие модальных окон по клику вне области
elements.resultModal.addEventListener('click', (e) => {
    if (e.target === elements.resultModal) {
        elements.resultModal.classList.remove('active');
    }
});

elements.hintModal.addEventListener('click', (e) => {
    if (e.target === elements.hintModal) {
        elements.hintModal.classList.remove('active');
    }
});

// Инициализация при загрузке
initGame();
