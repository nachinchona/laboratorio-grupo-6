package Aplicacion;

import java.util.concurrent.*;

public class EnvioControl extends Thread {

    private String[] mensajes = {"�Hail Santo Kissner!", "�Hola!", "Suscribete a nuestros canales de notificaciones", "�Santo Parra o Gerardo Kissner?"};
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private Beeper beeper = new Beeper(mensajes);

    public void setNotificador(Notificador notificador) {
        beeper.setNotificador(notificador);
    }

    public void run() {
        ScheduledFuture<?> beeperHandle = scheduler.scheduleAtFixedRate(beeper, 3, 3, TimeUnit.SECONDS);
        Runnable canceller = () -> beeperHandle.cancel(true);
        scheduler.schedule(canceller, 1, TimeUnit.HOURS);
    }

}