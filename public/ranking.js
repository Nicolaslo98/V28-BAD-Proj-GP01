export const rank = async () => {
    if (leaderBoard.style.display = 'flex') {
        try {
            const res = await fetch('/api/rank/room');
            const rankData = (await res.json()).rankData;
            let gameHistoryHTML = '';
            console.log(leaderBoard)
            for (let i = 0; i < rankData.length; i++) {
                const username = rankData[i].username;
                const totalScore = rankData[i].user_total_score;

                gameHistoryHTML += `
                <div class="playerInfo">
                    <p>${i + 1}</p>
                    <p>${username}</p>
                    <p>${totalScore}</p>
                </div>
              `;
            } document.querySelector('.playerInfo-container').innerHTML = gameHistoryHTML;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

