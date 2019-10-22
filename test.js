async function wait(ms) {
    await new Promise(res => {
        setTimeout(_ => res(), ms);
    });
    console.log('OK');
};

wait(5000);