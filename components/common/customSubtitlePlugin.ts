
const customSubtitlePlugin = {
    id: 'customSubtitle',
    afterDraw(chart: any) {
        const { ctx, chartArea: { top, right }, options } = chart;
        const subtitleOptions = options.plugins?.subtitle;

        if (subtitleOptions?.display) {
            ctx.save();

            // Define the parts of the subtitle and their corresponding colors
            const lines = [
                { text: 'This Month', color: '#6E6B7B' },
                { text: '$86,589', color: '#1E3A8A' }
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
