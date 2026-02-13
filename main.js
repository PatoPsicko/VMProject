document.addEventListener('DOMContentLoaded', () => {
    // --- Audio Setup ---
    const bgMusic = new Audio('assets/sounds/adoreyou.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.2;

    const startSound = new Audio('assets/sounds/start.mp3');
    startSound.volume = 0.5;

    const typingSound = new Audio('assets/sounds/typing.mp3');
    typingSound.loop = true;

    // --- Section 1 Logic ---
    const startBtn = document.getElementById('start-btn');
    const landingSection = document.getElementById('landing');

    startBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(console.error);
        }
        startSound.currentTime = 0;
        startSound.play();
        landingSection.style.opacity = '0';

        setTimeout(() => {
            landingSection.classList.add('hidden');
            landingSection.classList.remove('active');
            const section2 = document.getElementById('section2');
            if (section2) {
                section2.classList.remove('hidden');
                section2.classList.add('active');
            }
        }, 500);
    });

    // --- Section 2 Logic ---
    const giftContainer = document.getElementById('gift-container');
    const giftInvitation = document.getElementById('gift-invitation');
    const membersContainer = document.getElementById('members-container');

    // Members Data
    const members = [
        { id: 'member-harry', text: "Harry: Hola Marlene, sabía que vendrías..." },
        { id: 'member-louis', text: "Louis: Junto a Kevin preparamos esto especialmente para ti..." },
        { id: 'member-niall', text: "Niall: Porque te mereces todo el amor..." },
        { id: 'member-liam', text: "Liam: Y queríamos verte sonreír hoy..." },
        { id: 'member-zayn', text: "Zayn: Eres increíble, nunca lo olvides." },
        { id: 'member-kevin', text: "Kevin: Tengo preparada una carta para ti..." },
        { id: 'member-marlene', text: "Marlene: ¡Gracias chicos! Me encantó la sorpresa ❤️" }
    ];

    if (giftContainer) {
        giftContainer.addEventListener('click', () => {
            giftContainer.style.animation = 'none';
            giftContainer.style.transition = 'transform 0.5s, opacity 0.5s';
            giftContainer.style.transform = 'scale(1.5) rotate(10deg)';
            giftContainer.style.opacity = '0';

            if (giftInvitation) giftInvitation.style.opacity = '0';

            setTimeout(() => {
                giftContainer.classList.add('hidden');
                if (giftInvitation) giftInvitation.classList.add('hidden');
                membersContainer.classList.remove('hidden');
                startMemberSequence(0);
            }, 500);
        });
    }

    function startMemberSequence(index) {
        if (index >= members.length) {
            // Show Continue Button
            const continueBtn = document.getElementById('s2-continue-btn');
            if (continueBtn) {
                continueBtn.classList.remove('hidden');
                setTimeout(() => continueBtn.classList.add('visible'), 100);

                continueBtn.addEventListener('click', () => {
                    const section2 = document.getElementById('section2');
                    const section3 = document.getElementById('section3');

                    section2.style.opacity = '0';
                    setTimeout(() => {
                        section2.classList.add('hidden');
                        section2.classList.remove('active');
                        if (section3) {
                            section3.classList.remove('hidden');
                            section3.classList.add('active');
                        }
                    }, 500);
                });
            }
            return;
        }

        const memberData = members[index];
        const memberEl = document.getElementById(memberData.id);

        if (memberEl) {
            const textEl = memberEl.querySelector('.typing-text');
            memberEl.classList.remove('hidden');
            setTimeout(() => memberEl.classList.add('visible'), 50);

            if (membersContainer) {
                membersContainer.scrollTop = membersContainer.scrollHeight;
            }

            if (textEl) {
                textEl.textContent = '';
                typingSound.play().catch(() => { });
                typeWriter(textEl, memberData.text, 5000, () => {
                    typingSound.pause();
                    typingSound.currentTime = 0;
                    setTimeout(() => {
                        startMemberSequence(index + 1);
                    }, 1000);
                });
            }
        } else {
            startMemberSequence(index + 1);
        }
    }

    // --- Section 3 Logic: The Letter ---
    const envelope = document.getElementById('envelope');
    const letterContent = document.querySelector('.letter-content');
    const clickHint = document.querySelector('.click-hint');

    if (envelope) {
        envelope.addEventListener('click', () => {
            if (!envelope.classList.contains('open')) {
                envelope.classList.add('open');
                if (clickHint) clickHint.classList.add('hidden-hint');

                setTimeout(() => {
                    if (letterContent) {
                        letterContent.classList.add('reading-view');

                        // Add Button to go to Section 4
                        if (!document.querySelector('.next-section-btn')) {
                            const btn = document.createElement('button');
                            btn.classList.add('next-section-btn');
                            btn.textContent = 'Continuar 💌';
                            btn.addEventListener('click', goToSection4);
                            letterContent.querySelector('.crochet-border').appendChild(btn);
                        }

                        createHeartRain();
                    }
                }, 800);
            }
        });
    }

    function goToSection4() {
        const section3 = document.getElementById('section3');
        const section4 = document.getElementById('section4');

        if (section3) {
            section3.style.opacity = '0';
            setTimeout(() => {
                section3.classList.add('hidden');
                section3.classList.remove('active');
                if (section4) {
                    section4.classList.remove('hidden');
                    section4.classList.add('active');
                    startRoseRain();
                }
            }, 500);
        }
    }

    // --- Section 4 Logic: Celebration ---
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            location.reload();
        });
    }

    // ... (Keep createHeartRain distinct if needed, or remove if unused here) ...
    function createHeartRain() {
        // ... existing heart rain ...
        const colors = ['#ff6f61', '#ff9a9e', '#fad0c4', '#ffffff', '#e6e6fa'];
        const section3 = document.getElementById('section3');
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                if (!section3.classList.contains('active')) return;
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = '❤️';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
                heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
                heart.style.color = colors[Math.floor(Math.random() * colors.length)];
                section3.appendChild(heart);
                setTimeout(() => { heart.remove(); }, 6000);
            }, i * 100);
        }
    }

    function startRoseRain() {
        const section4 = document.getElementById('section4');
        // Romantic Palette: Reds, Deep Pinks, Soft Pinks
        const colors = ['#d4143a', '#ff0033', '#db2d43', '#ff69b4', '#ffb7c5', '#ffe4e1'];

        setInterval(() => {
            if (!section4.classList.contains('active')) return;

            const petal = document.createElement('div');
            petal.classList.add('rose-petal');

            // Random start position
            petal.style.left = Math.random() * 100 + 'vw';

            // Random scale for variety
            const scale = Math.random() * 0.5 + 0.8; // 0.8 to 1.3
            petal.style.transform = `scale(${scale})`;

            // Background color variation
            petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Varied duration for natural feel (6s to 10s)
            petal.style.animationDuration = (Math.random() * 4 + 6) + 's';
            // Varied delay
            petal.style.animationDelay = (Math.random() * 2) + 's';

            section4.appendChild(petal);

            // Cleanup after animation (10s max duration + delay)
            setTimeout(() => petal.remove(), 12000);
        }, 400); // Slower frequency (one every 400ms) for subtlety
    }


    function typeWriter(element, text, duration, callback) {
        const totalChars = text.length;
        const intervalTime = totalChars > 0 ? duration / totalChars : 0;
        let i = 0;

        function loop() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(loop, intervalTime);
            } else {
                if (callback) callback();
            }
        }
        loop();
    }
});
