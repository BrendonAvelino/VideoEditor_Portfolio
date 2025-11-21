document.addEventListener('DOMContentLoaded', () => {

    console.log("Portfólio v28 - Final: Tradução dos modais corrigida.");

    // ===================================================================
    // THREE.JS - VERSÃO 2.1: ANIMAÇÃO SUTIL E CURSOR "COMETA" SEGUINDO O CURSOR PADRÃO
    // ===================================================================
    if (typeof THREE !== 'undefined') {
        // 1. Configuração da Cena
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg-canvas'),
            alpha: true
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.setZ(50);

        // 2. Partículas Sutis
        const particleCount = 3000;
        const particlesGeometry = new THREE.BufferGeometry();
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x007799,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleMesh);

        // 3. Cursor "Cometa" Elegante
        const trailLength = 15;
        const trail = [];
        for (let i = 0; i < trailLength; i++) {
            const geometry = new THREE.SphereGeometry(i === 0 ? 0.5 : 0.2, 8, 8);
            const material = new THREE.MeshBasicMaterial({ 
                color: i === 0 ? 0x00e5ff : 0xb300ff,
                transparent: true,
                opacity: 1 - (i / trailLength)
            });
            const sphere = new THREE.Mesh(geometry, material);
            trail.push(sphere);
            scene.add(sphere);
        }

        // 4. Lógica do Mouse
        const mousePosition = new THREE.Vector2();
        document.addEventListener('mousemove', (event) => {
            mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
            mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // 5. Loop de Animação
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            particleMesh.rotation.y = 0.02 * elapsedTime;

            const vector = new THREE.Vector3(mousePosition.x, mousePosition.y, 0.5);
            vector.unproject(camera);
            const dir = vector.sub(camera.position).normalize();
            const distance = -camera.position.z / dir.z;
            const targetPosition = camera.position.clone().add(dir.multiplyScalar(distance));

            trail[0].position.lerp(targetPosition, 0.4);
            for (let i = 1; i < trailLength; i++) {
                trail[i].position.lerp(trail[i - 1].position, 0.4);
            }
            
            renderer.render(scene, camera);
        };
        animate();

        // 6. Responsividade
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        });
    }

    // ===================================================================
    // LÓGICA DE TRADUÇÃO (i18n) - COM MODAIS DE SERVIÇO
    // ===================================================================
    const translations = {
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_services: "Services",
            nav_gallery: "Gallery",
            nav_testimonials: "Testimonials",
            nav_faq: "FAQ",
            nav_contact: "Contact",
            hero_title: "Video Editor / Motion Designer",
            about_title: "ABOUT ME",
            about_text: "I'm a video editor, motion designer, and front-end developer. My passion is to merge the art of editing with the precision of technology to create unique visual experiences. I am constantly evolving, always seeking the next level in every project, with a total focus on quality and delivering impressive results.",
            services_title: "SERVICES",
            service1_title: "YouTube Videos",
            service1_desc: "Complete editing for channels, including cuts, soundtrack, subtitles, and color correction to engage your audience.",
            service2_title: "Social Media Videos",
            service2_desc: "Editing of short and dynamic videos for Reels, TikTok, and Stories, optimized for fast and viral consumption.",
            process_title: "MY PROCESS",
            process1_title: "Briefing & Strategy",
            process1_desc: "Together, we understand your goals and the vision for the project.",
            process2_title: "Creation & Editing",
            process2_desc: "This is where the magic happens, turning raw material into a story.",
            process3_title: "Review & Delivery",
            process3_desc: "You review the material, and after final adjustments, the project is delivered in high quality.",
            gallery_title: "GALLERY",
            testimonials_title: "WHAT THEY SAY ABOUT MY WORK",
            testimonial_quote: '"Brendon delivered a very well-edited video, with exactly the vibe I wanted for my channel. The editing was clean, fluid, and just right, showing care in every detail. He also respected the deadline perfectly, which helped me a lot with my schedule."',
            testimonial_role: "Travel YouTuber",
            faq_title: "FREQUENTLY ASKED QUESTIONS",
            faq1_q: "How does the payment process work?",
            faq1_a: "Payment is split into two parts: 50% of the total amount upfront to start the project, and the remaining 50% upon final delivery, after your approval.",
            faq2_q: "How many revisions are included in the project?",
            faq2_a: "Each project includes up to two full revision rounds. The goal is to ensure you are 100% satisfied with the result. Additional revisions can be negotiated separately.",
            faq3_q: "In what format are the videos delivered?",
            faq3_a: "Videos are delivered in MP4 format with the resolution and codec optimized for the target platform (YouTube, Instagram, etc.), ensuring maximum quality and performance.",
            contact_title: "CONTACT",
            contact_text: "Liked my work? Let's create something amazing together.",
            contact_button: "GET IN TOUCH",
            footer_text: "© 2025 Brendon Harrisson. All rights reserved.",
            form_title: "Send your message",
            form_name: "Your Name",
            form_email: "Your Email",
            form_message: "Message",
            form_submit: "Send Message",
            // Traduções dos Modais de Serviço
            s_yt_title: "YouTube Videos",
            s_yt_desc: "I transform your raw footage into dynamic videos that retain viewer attention, increase watch time, and strengthen your channel's identity.",
            s_include_title: "What's included:",
            s_yt_item1: "✓ Fluid cuts and assembly",
            s_yt_item2: "✓ Audio treatment and mixing",
            s_yt_item3: "✓ Professional color correction",
            s_yt_item4: "✓ Motion graphics (texts, lower thirds)",
            s_yt_item5: "✓ Inclusion of royalty-free soundtrack",
            s_yt_item6: "✓ High-quality rendering (4K/1080p)",
            s_cta_button: "I want a quote",
            s_social_title: "Social Media Videos",
            s_social_desc: "I create short and impactful videos, optimized for the vertical format of platforms like Reels, TikTok, and Shorts, focused on virality and quick engagement.",
            s_social_item1: "✓ Dynamic vertical editing",
            s_social_item2: "✓ Stylized and easy-to-read subtitles",
            s_social_item3: "✓ Use of trending music and audio",
            s_social_item4: "✓ Creative visual effects and transitions",
            s_social_item5: "✓ Call-to-actions (CTAs) for conversion",
            s_social_item6: "✓ Optimized export for each platform",
        },
        pt: {
            nav_home: "Início",
            nav_about: "Sobre",
            nav_services: "Serviços",
            nav_gallery: "Galeria",
            nav_testimonials: "Depoimentos",
            nav_faq: "FAQ",
            nav_contact: "Contato",
            hero_title: "Video Editor / Motion Designer",
            about_title: "SOBRE MIM",
            about_text: "Sou editor de vídeo, motion designer e desenvolvedor front-end. Minha paixão é unir a arte da edição com a precisão da tecnologia para criar experiências visuais únicas. Estou em constante evolução, sempre buscando o próximo nível em cada projeto, com foco total na qualidade e na entrega de resultados que impressionam.",
            services_title: "SERVIÇOS",
            service1_title: "Vídeos para YouTube",
            service1_desc: "Edição completa para canais, incluindo cortes, trilha sonora, legendas e correção de cor para engajar sua audiência.",
            service2_title: "Vídeos para Redes Sociais",
            service2_desc: "Edição de vídeos curtos e dinâmicos para Reels, TikTok e Stories, otimizados para o consumo rápido e viral.",
            process_title: "MEU PROCESSO",
            process1_title: "Briefing e Estratégia",
            process1_desc: "Entendemos juntos suas metas e a visão para o projeto.",
            process2_title: "Criação e Edição",
            process2_desc: "É aqui que a mágica acontece, transformando o material bruto em uma história.",
            process3_title: "Revisão e Entrega",
            process3_desc: "Você revisa o material e, após os ajustes finais, o projeto é entregue em alta qualidade.",
            gallery_title: "GALERIA",
            testimonials_title: "O QUE DIZEM SOBRE MEU TRABALHO",
            testimonial_quote: '"O Brendon entregou um vídeo muito bem editado, com exatamente a vibe que eu queria pro meu canal. A edição ficou limpa, fluida e do jeitinho certo, mostrando cuidado em cada detalhe. Ele também respeitou o prazo certinho, o que me ajudou muito na organização."',
            testimonial_role: "YouTuber de Viagens",
            faq_title: "PERGUNTAS FREQUENTES",
            faq1_q: "Como funciona o processo de pagamento?",
            faq1_a: "O pagamento é dividido em duas partes: 50% do valor total adiantado para iniciar o projeto e os 50% restantes na entrega final, após sua aprovação.",
            faq2_q: "Quantas revisões estão inclusas no projeto?",
            faq2_a: "Cada projeto inclui até duas rodadas de revisão completas. O objetivo é garantir que você fique 100% satisfeito com o resultado. Revisões adicionais podem ser negociadas à parte.",
            faq3_q: "Em qual formato os vídeos são entregues?",
            faq3_a: "Os vídeos são entregues no formato MP4 com a resolução e o codec otimizados para a plataforma de destino (YouTube, Instagram, etc.), garantindo máxima qualidade e performance.",
            contact_title: "CONTATO",
            contact_text: "Gostou do meu trabalho? Vamos criar algo incrível juntos.",
            contact_button: "ENTRAR EM CONTATO",
            footer_text: "© 2025 Brendon Harrisson. Todos os direitos reservados.",
            form_title: "Envie sua mensagem",
            form_name: "Seu Nome",
            form_email: "Seu E-mail",
            form_message: "Mensagem",
            form_submit: "Enviar Mensagem",
            // Traduções dos Modais de Serviço
            s_yt_title: "Vídeos para YouTube",
            s_yt_desc: "Transformo suas gravações brutas em vídeos dinâmicos que retêm a atenção do espectador, aumentam o tempo de exibição e fortalecem a identidade do seu canal.",
            s_include_title: "O que está incluso:",
            s_yt_item1: "✓ Cortes e montagem fluida",
            s_yt_item2: "✓ Tratamento e mixagem de áudio",
            s_yt_item3: "✓ Correção de cor profissional",
            s_yt_item4: "✓ Motion graphics (textos, lower thirds)",
            s_yt_item5: "✓ Inclusão de trilha sonora (livre de royalties)",
            s_yt_item6: "✓ Renderização em alta qualidade (4K/1080p)",
            s_cta_button: "Quero um orçamento",
            s_social_title: "Vídeos para Redes Sociais",
            s_social_desc: "Crio vídeos curtos e impactantes, otimizados para o formato vertical de plataformas como Reels, TikTok e Shorts, focados em viralização e engajamento rápido.",
            s_social_item1: "✓ Edição vertical dinâmica",
            s_social_item2: "✓ Legendas estilizadas e de fácil leitura",
            s_social_item3: "✓ Uso de músicas e áudios em alta",
            s_social_item4: "✓ Efeitos visuais e transições criativas",
            s_social_item5: "✓ Call-to-actions (CTAs) para conversão",
            s_social_item6: "✓ Exportação otimizada para cada plataforma",
        }
    };

    const langToggleButton = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('lang') || 'pt';

    const setLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('lang', lang);
        langToggleButton.textContent = lang === 'pt' ? 'EN' : 'PT';
    };

    langToggleButton.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(currentLang);
    });

    setLanguage(currentLang);

    // ===================================================================
    // LÓGICA DO MENU MOBILE (HAMBÚRGUER)
    // ===================================================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('open');
        mobileNavMenu.classList.toggle('open');
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('open');
            mobileNavMenu.classList.remove('open');
        });
    });

    // ===================================================================
    // ANIMAÇÃO DAS LINHAS DE SCROLL
    // ===================================================================
    const leftLine = document.querySelector('.left-line');
    const rightLine = document.querySelector('.right-line');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        leftLine.style.height = scrollPercent + '%';
        rightLine.style.height = scrollPercent + '%';
    });

    // ===================================================================
    // EFEITO DE "FADE IN" NAS SEÇÕES AO ROLAR A PÁGINA
    // ===================================================================
    const sections = document.querySelectorAll('.content-section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ===================================================================
    // LÓGICA DA GALERIA DE VÍDEOS (PLAYER NATIVO)
    // ===================================================================
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const videoId = item.getAttribute('data-video-id');
        
        if (videoId) {
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?rel=0&controls=1` );
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            iframe.setAttribute('allowfullscreen', '');
            
            const playIcon = item.querySelector('.play-icon');
            if (playIcon) {
                item.removeChild(playIcon);
            }
            item.appendChild(iframe);
        }
    });

    // ===================================================================
    // LÓGICA PARA O ACORDEÃO DO FAQ
    // ===================================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // ===================================================================
    // LÓGICA GERAL DOS MODAIS (CONTATO E SERVIÇOS)
    // ===================================================================
    const contactModal = document.getElementById('contact-modal');
    const openContactModalBtn = document.getElementById('open-contact-modal');

    // Abrir modal de contato
    openContactModalBtn.addEventListener('click', () => {
        contactModal.classList.add('visible');
    });

    // Lógica para os modais de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceId = card.getAttribute('data-service-id');
            const targetModal = document.getElementById(`service-modal-${serviceId}`);
            if (targetModal) {
                targetModal.classList.add('visible');
            }
        });
    });

    // Lógica para fechar QUALQUER modal
    const allModals = document.querySelectorAll('.modal-overlay');
    allModals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('visible');
            });
        }
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('visible');
            }
        });
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            allModals.forEach(modal => {
                if (modal.classList.contains('visible')) {
                    modal.classList.remove('visible');
                }
            });
        }
    });

    // Lógica para o botão "Quero um orçamento" dentro do modal de serviço
    const openContactFromServiceBtns = document.querySelectorAll('.open-contact-from-service');
    openContactFromServiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentServiceModal = btn.closest('.service-modal');
            if (currentServiceModal) {
                currentServiceModal.classList.remove('visible');
            }
            contactModal.classList.add('visible');
        });
    });

    // ===================================================================
    // LÓGICA DE ENVIO DO FORMULÁRIO (FORMSSPREE COM AJAX)
    // ===================================================================
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerHTML = currentLang === 'pt' ? "Obrigado! Sua mensagem foi enviada." : "Thank you! Your message has been sent.";
                status.style.color = "var(--primary-start)";
                form.reset();
                setTimeout(() => {
                    const visibleModal = document.querySelector('.modal-overlay.visible');
                    if(visibleModal) visibleModal.classList.remove('visible');
                    status.innerHTML = "";
                }, 2000);
            } else {
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    status.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = currentLang === 'pt' ? "Oops! Houve um problema ao enviar seu formulário." : "Oops! There was a problem submitting your form.";
                }
                status.style.color = "#ff4d4d";
            }
        } catch (error) {
            status.innerHTML = currentLang === 'pt' ? "Oops! Houve um problema de conexão. Tente novamente." : "Oops! There was a connection problem. Please try again.";
            status.style.color = "#ff4d4d";
        }
    }

    form.addEventListener("submit", handleSubmit);
});
