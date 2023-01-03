displayJoke = (req, res) => {
    const data = 
        'How did the telephone propose to his girlfriend? ...He gave her a ring.';
    res.status(200).send(data);
};

modules.exports = {
    displayJoke,
};
