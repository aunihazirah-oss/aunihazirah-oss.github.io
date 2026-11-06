// Interaksi laman web Homestay Japandi Kulim
document.addEventListener('DOMContentLoaded', () => {
    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) question.addEventListener('click', () => item.classList.toggle('active'));
    });

    // Navigasi mudah alih
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            if (isOpen) {
                Object.assign(navLinks.style, {
                    display: 'flex', flexDirection: 'column', position: 'absolute',
                    top: '80px', left: '0', width: '100%', background: '#FAF8F5',
                    padding: '20px', borderBottom: '1px solid #E2DBD0', zIndex: '1000'
                });
            } else {
                navLinks.removeAttribute('style');
            }
        });
    }

    // Widget semakan tarikh di halaman utama: bawa maklumat ke halaman tempahan
    const heroForm = document.getElementById('heroBookingForm');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            if (checkout <= checkin) {
                alert('Tarikh check-out mestilah selepas tarikh check-in.');
                return;
            }
            const params = new URLSearchParams({ checkin, checkout, guests });
            window.location.href = `booking.html?${params.toString()}#booking`;
        });
    }

    // Isikan tarikh daripada widget utama pada borang tempahan
    const params = new URLSearchParams(window.location.search);
    const checkinField = document.getElementById('bookCheckin');
    const checkoutField = document.getElementById('bookCheckout');
    if (checkinField && params.get('checkin')) checkinField.value = params.get('checkin');
    if (checkoutField && params.get('checkout')) checkoutField.value = params.get('checkout');

    // Hantar permintaan tempahan melalui WhatsApp
    const bookingForm = document.getElementById('directBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('guestName').value.trim();
            const phone = document.getElementById('guestPhone').value.trim();
            const checkin = document.getElementById('bookCheckin').value;
            const checkout = document.getElementById('bookCheckout').value;
            const notes = document.getElementById('notes').value.trim();
            if (checkout <= checkin) {
                alert('Tarikh check-out mestilah selepas tarikh check-in.');
                return;
            }
            const message = [
                'Hai Homestay Japandi Kulim! Saya ingin membuat tempahan seluruh rumah (5 bilik):',
                '', `Nama: ${name}`, `No. Tel: ${phone}`,
                `Check-in: ${checkin}`, `Check-out: ${checkout}`,
                `Catatan: ${notes || '-'}`
            ].join('\n');
            window.open(`https://wa.me/60123456789?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
        });
    }
});