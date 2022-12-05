import { IocContract } from "@adonisjs/fold";
import QueueManager from "../src/queue/QueueManager";
import { Application } from "@adonisjs/application";

export default class QueueProvider {
	constructor(protected container: IocContract) {}

	/**
	 * Register the redis binding
	 */
	public register() {
		this.container.singleton("Adonis/Queue", () => {
			const app: Application = this.container.use("Adonis/Core/Application");
			const queueConfig = this.container
				.use("Adonis/Core/Config")
				.get("queue", {});
			return new QueueManager(queueConfig, app.appRoot);
		});
	}

	/**
	 * Registering the health check checker with HealthCheck service
	 */
	public boot() {}
}
