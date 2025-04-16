
const customSubtitlePlugin = {
    id: 'customSubtitle',
    afterDraw(chart: any) {
        const { ctx, chartArea: { top, right }, options } = chart;
        const subtitleOptions = options.plugins?.subtitle;

        if (subtitleOptions?.display) {
            ctx.save();

            // Get dynamic values from options
            const currentMonth = subtitleOptions.currentMonth || "N/A";
            const currentExpense = subtitleOptions.currentExpense || 0;

            // Define the subtitle lines
            const lines = [
                { text: `This Month (${currentMonth})`, color: "#6E6B7B" },
                { text: `$${currentExpense.toLocaleString()}`, color: "#1E3A8A" }
            ];

            // Set common font properties
            const fontSize = subtitleOptions.font?.size ?? 14;
            const fontWeight = subtitleOptions.font?.weight ?? 'normal';
            const fontFamily = subtitleOptions.font?.family ?? 'Arial';
            ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
            ctx.textAlign = 'right';
            ctx.textBaseline = 'top';

            // Calculate the starting y position
            let y = top + (subtitleOptions.padding?.top ?? 0);

            // Render each line with its specified color
            lines.forEach(line => {
                ctx.fillStyle = line.color;
                ctx.fillText(line.text, right, y);
                y += fontSize;
            });

            ctx.restore();
        }
    }
};

export default customSubtitlePlugin;
