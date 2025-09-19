import { useTranslation } from "react-i18next";

export const AboutContent = () => {
	const { t } = useTranslation();

	return (
		<div className="space-y-4">
			<p className="text-base leading-relaxed">{t("about.description")}</p>
			<p>
				URL:{" "}
				<a
					href="https://github.com/arturgomes/my-working-hours.git"
					target="_blank"
					rel="noopener noreferrer"
				>
					https://github.com/arturgomes/my-working-hours.git
				</a>
			</p>
			<div>
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
					{t("about.features")}
				</h3>
				<ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
					<li>{t("about.feature1")}</li>
					<li>{t("about.feature2")}</li>
					<li>{t("about.feature3")}</li>
					<li>{t("about.feature4")}</li>
					<li>{t("about.feature5")}</li>
				</ul>
			</div>

			<div>
				<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
					{t("about.techStack")}
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300">
					<div className="space-y-1">
						<span className="font-medium">Frontend:</span>
						<ul className="list-disc list-inside ml-4 space-y-1">
							<li>React 19</li>
							<li>TypeScript</li>
							<li>Vite</li>
							<li>Tailwind CSS v4</li>
						</ul>
					</div>
					<div className="space-y-1">
						<span className="font-medium">Libraries:</span>
						<ul className="list-disc list-inside ml-4 space-y-1">
							<li>Redux Toolkit</li>
							<li>Ark UI</li>
							<li>React Hook Form</li>
							<li>i18next</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
